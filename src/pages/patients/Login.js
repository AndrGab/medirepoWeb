import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MedirepoIcon from '../../assets/medirepo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useUserDispatch, loginUser } from '../../context/UserContext'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img: {
        width: 150,
        marginRight: theme.spacing(2),

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    errormsg: {
        color: '#f72314',
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },

}));

export default function SignIn() {

    var userDispatch = useUserDispatch();

    const classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [login, setCodpac] = useState("");
    var [password, setPassword] = useState("");
    var [dt_nasc, setDtnasc] = useState("");
    var [id, setHospital] = useState("");

    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();


        const data = {
            login,
            password,
            dt_nasc,
            id
        };

        loginUser(
            userDispatch,
            data,
            history,
            setIsLoading,
            setError,
        )

    }

    return (
        <>
            <div className={classes.root}>
                <AppBar color='inherit' position="static">
                    <Toolbar>
                        <img src={MedirepoIcon} className={classes.img} alt="MediRepo" />
                    </Toolbar>
                </AppBar>
            </div>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography color='primary' component="h6" variant="h6">
                        LOGIN
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="cod_pac"
                            label="Código do Paciente"
                            name="cod_pac"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setCodpac(e.target.value)}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}

                        />
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
                            onChange={e => setDtnasc(e.target.value)}

                        />

                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel htmlFor='nascimento' id="simple-select-outlined-label">Hospital</InputLabel>
                            <Select
                                labelId="simple-select-outlined-label"
                                id="simple-select-outlined"
                                native
                                required
                                inputProps={{
                                    name: 'hospital',
                                    id: 'hospital_id',
                                }}
                                input={
                                    <OutlinedInput
                                        shrink="true"
                                        labelWidth={62}
                                        name="age"
                                        id="simple-select-outline"
                                    />


                                }
                                onChange={e => setHospital(e.target.value)}


                            >
                                <option aria-label="None" value="" />
                                <option value={"bc4b53a9-4d42-4d62-be11-1078775b967b"}>Santa Casa de Londrina</option>
                                <option value={20}>Hospital Evangélico</option>
                                <option value={30}>Hospital San Francisco</option>
                            </Select>
                        </FormControl>
                        {isLoading ? (
                            <CircularProgress size={26} />
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                ACESSAR
                            </Button>
                        )}
                        <Grid alignItems='center' container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a Senha?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Login para Hospitais, clique aqui"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Fade in={error}>
                            <Typography className={classes.errormsg}>
                                Algo de errado com o código ou senha :(
                </Typography>
                        </Fade>
                    </form>
                </div>

            </Container>
        </>
    );
}