import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useUserDispatch, signOut } from "../../../context/UserContext";
import api from "../../../services/Api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',

    },
    card: {
        paddingTop: '0px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '10px',
    },
    img: {
        width: 100,
        marginRight: theme.spacing(2),
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        width: '120px',
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        width: "100%",
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    progress: {
        marginTop: theme.spacing(1),
    },
}));

function Account() {

    var userDispatch = useUserDispatch();
    const history = useHistory();
    const classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    const token = localStorage.getItem("token");


    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
        };


        if (!!name && !!email) {
            const token = localStorage.getItem("token");
            setIsLoading(true);
            try {
                await api.put("hospitals", data, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                setIsLoading(false);
                toast.success("Alteração gravada com sucesso");

            } catch (err) {
                setIsLoading(false);

                if (!!err.response.data.message.email) {
                    toast.warning("Formato do e-mail inválido");
                }
                if (!!err.response.data.message.name) {
                    toast.warning("O nome deve ter pelo menos 2 caracteres");
                }
                if (!!err.response.data.message.password) {
                    toast.warning("A senha deve ter pelo menos 6 caracteres");
                }

                if (err.response.status === 401) {
                    toast.warning("Acesso Negado!");
                    signOut(userDispatch, history)

                }

                console.log(err);
            }
        }
    }


    useEffect(() => {

        api
            .get("hospitals", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setName(response.data.hospital.name);
                setEmail(response.data.hospital.email);

            })
            .catch(error => {

                if (error.response) {
                    console.log(error.response.status);
                    toast.warning("Acesso Negado!");
                    signOut(userDispatch, history)

                } else if (error.request) {
                    console.log(error.request);

                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, [token, history, userDispatch]);

    return (
        <div>
            <Container component="main">
                <div className={classes.paper}>

                    <form className={classes.form} noValidate onSubmit={handleRegister}>
                        <Card className={classes.card}>
                            <CardHeader titleTypographyProps={{ variant: 'h6' }} title="CADASTRO" subheader="Alteração do Cadastro" />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nome do Hospital"
                                name="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="E-mail"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {isLoading ? (
                                <LinearProgress className={classes.progress} />
                            ) : (
                                <>
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
                                            ATUALIZAR
                                        </Button>
                                    </Box>
                                </>

                            )}
                        </Card>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default withRouter(Account);
