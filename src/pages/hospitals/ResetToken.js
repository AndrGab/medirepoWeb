import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid';
import MedirepoIcon from '../../assets/medirepo.svg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import api from '../../services/Api';
import { toast } from 'react-toastify';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img: {
        width: 100,
        marginRight: theme.spacing(2),

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        width: '100%',
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

    }

}));

function ResetToken() {

    const classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [email, setEmail] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email
        };

        if (!!email) {
            setIsLoading(true);
            try {
                const response = await api.post('hospitals/reset', data);
                setIsLoading(false);
                toast.success("Um Token para login rápido foi enviado ao seu e-mail");
                console.log(response.data.message);

            } catch (err) {
                console.log(err);
                toast.dark("Algo de errado com seu e-mail");
                setIsLoading(false);

            }
        }
    }

    return (
        <div>
            <div className={classes.root}>
                <AppBar color='inherit' position="static">
                    <Toolbar>
                        <img src={MedirepoIcon} className={classes.img} alt="MediRepo" />
                    </Toolbar>
                </AppBar>
            </div>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <VpnKeyIcon color='primary' />
                    <Typography color='primary' component="h6" variant="button">
                        RESET PASSWORD TOKEN
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}

                        />
                        {isLoading ? (
                            <LinearProgress className={classes.progress} />
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                ENVIAR
                            </Button>
                        )}
                        <Grid alignItems='center' container>
                            <Grid item>
                                <Link href="/hospitals/login" variant="body2">
                                    {"Login para Hospitais, clique aqui"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>
        </div>
    );
}

export default withRouter(ResetToken);