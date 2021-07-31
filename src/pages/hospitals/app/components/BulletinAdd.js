import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { TextField, Card, CardHeader, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../../../services/Api';
import { toast } from 'react-toastify';
import { useUserDispatch, signOut } from "../../../../context/UserContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        width: "100%",
        marginTop: theme.spacing(0),
        minWidth: 120,
    },

    card: {
        paddingTop: '0px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '10px',
    },
    img: {
        width: 100,
        marginRight: theme.spacing(4),

    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    submit: {
        width: '120px',
        margin: theme.spacing(1, 0, 0),
    },
}));

function BulletinAdd() {

    var [isLoading, setIsLoading] = useState(false);
    var userDispatch = useUserDispatch();
    const history = useHistory();
    const classes = useStyles();
    const token = localStorage.getItem("token");
    var [nome, setNome] = useState("");
    var [dt_nascimento, setDtnasc] = useState("");
    var [geral, setGeral] = useState("");
    var [pressao, setPressao] = useState("");
    var [consciencia, setConsciencia] = useState("");
    var [febre, setFebre] = useState("");
    var [respiracao, setRespiracao] = useState("");
    var [diurese, setDiurese] = useState("");
    var [obs, setObs] = useState("");
    var [medico, setMedico] = useState("");
    var [dt_assinatura, setDtassinatura] = useState("");
    var [atendimento, setAtendime] = useState(0);
    var [cd_paciente, setCodpac] = useState(0);

    async function handleRegisterBulletin(e) {
        e.preventDefault();

        const data = {
            nome,
            dt_nascimento,
            geral, pressao, consciencia, febre, respiracao,
            diurese, obs, medico, dt_assinatura, atendimento, cd_paciente
        };


        if (!!atendimento && !!cd_paciente) {
            setIsLoading(true);
            try {
                const response = await api.post("bulletins", data, {
                    headers: { 'Authorization': 'Bearer ' + token },
                });
                if (response.status === 201) {
                    setIsLoading(false);
                    toast.success('Boletim Criado com Sucesso!');
                }
            } catch (err) {
                setIsLoading(false);
                if (!!err.response.data.message.atendimento) {
                    toast.warning("O Código do Atendimento deve ser numérico");
                }
                if (!!err.response.data.message.cd_paciente) {
                    toast.warning("O Código do paciente deve ser numérico");
                }
                if (!!err.response.data.message.nome) {
                    toast.warning("O nome deve ter pelo menos 2 caracteres");
                }
                if (!!err.response.data.message.obs) {
                    toast.warning("A observação deve ter pelo menos 6 caracteres");
                } else {
                    toast.error("Ocorreu um erro ao criar o boletim: " +
                        JSON.stringify(err.response.data.message));

                }

                if (err.response.status === 401) {
                    toast.warning("Acesso Negado!");
                    signOut(userDispatch, history)

                }

                console.log(err);
            }
        } else {
            toast.error("Preencha Código de Paciente e Atendimento");
        }
    }



    return (
        <div>

            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Card className={classes.card}>
                        <CardHeader titleTypographyProps={{ variant: 'h6' }} title="BOLETIM MÉDICO" />
                        <form className={classes.form} noValidate onSubmit={handleRegisterBulletin}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="codpac"
                                        label="Código do Paciente"
                                        name="codpac"
                                        autoFocus
                                        onChange={(e) => setCodpac(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="atendime"
                                        label="Código do Atendimento"
                                        name="atendime"
                                        onChange={(e) => setAtendime(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="data_nasc"
                                        label="Data de Nascimento"
                                        type="date"
                                        id="data_nasc"
                                        autoComplete="data de nascimento"
                                        onChange={(e) => setDtnasc(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nome"
                                        label="Nome do Paciente"
                                        name="nome"
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="Estado Geral"
                                            id="simple-select-outlined-label"
                                        >
                                            Estado Geral{" "}
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Estado Geral",
                                                id: "geral",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={92}
                                                    name="geral"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setGeral(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Normal'> Normal  </option>
                                            <option value='Grave'> Grave  </option>
                                            <option value='Estável'> Estável  </option>
                                            <option value='Bom'> Bom  </option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="Pressão"
                                            id="simple-select-outlined-label"
                                        >
                                            Pressão Arterial{" "}
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Pressão Arterial",
                                                id: "pressao",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={120}
                                                    name="pressao"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setPressao(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Normal'> Normal  </option>
                                            <option value='Alta'> Alta  </option>
                                            <option value='Baixa'> Baixa  </option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="Consciência"
                                            id="simple-select-outlined-label"
                                        >
                                            Nível de Consciência
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Nível de Consciência",
                                                id: "consciencia",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={150}
                                                    name="consciencia"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setConsciencia(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Consciente'> Consciente  </option>
                                            <option value='Sedado'> Sedado  </option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="febre"
                                            id="simple-select-outlined-label"
                                        >
                                            Febre{" "}
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Febre",
                                                id: "febre",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={45}
                                                    name="febre"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setFebre(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Ausente'> Ausente  </option>
                                            <option value='Presente'> Presente  </option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="respiracao"
                                            id="simple-select-outlined-label"
                                        >
                                            Respiração{" "}
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Respiração",
                                                id: "respiracao",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={85}
                                                    name="respiracao"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setRespiracao(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Normal'> Normal  </option>
                                            <option value='Por Aparelhos'> Por Aparelhos  </option>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel
                                            htmlFor="diurese"
                                            id="simple-select-outlined-label"
                                        >
                                            Diurese{" "}
                                        </InputLabel>
                                        <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"
                                            native
                                            required
                                            inputProps={{
                                                name: "Diurese",
                                                id: "diurese",
                                            }}
                                            input={
                                                <OutlinedInput
                                                    shrink="true"
                                                    labelWidth={62}
                                                    name="diurese"
                                                    id="simple-select-outline"
                                                />
                                            }
                                            onChange={(e) => setDiurese(e.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value='Aumentada'>Aumentada</option>
                                            <option value='Diminuida'> Diminuida  </option>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="obs"
                                        label="Observações"
                                        name="obs"
                                        onChange={(e) => setObs(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="medico"
                                        label="Nome do Médico"
                                        name="medico"
                                        onChange={(e) => setMedico(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="data"
                                        label="Data do Boletim"
                                        type="date"
                                        id="dt_assinatura"
                                        autoComplete="data de assinatura"
                                        onChange={(e) => setDtassinatura(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            {isLoading ? (
                                <LinearProgress className={classes.progress} />
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 2
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        CADASTRAR
                                    </Button>
                                </Box>

                            )}
                        </form>

                    </Card>
                </div>
            </Container>

        </div>
    );
}

export default withRouter(BulletinAdd);