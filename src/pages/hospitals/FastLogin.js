import React, { useEffect } from 'react';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import MedirepoIcon from '../../assets/medirepo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useUserDispatch, loginHosp } from '../../context/UserContext'
import api from '../../services/Api';
import Link from '@material-ui/core/Link';

import { toast } from 'react-toastify';


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

}));

function FastLogin() {

    var userDispatch = useUserDispatch();

    const classes = useStyles();
    var { id, resetToken } = useParams();

    var reset_token = resetToken

    const history = useHistory();


    const data = {
        id,
        reset_token
    };

    useEffect(() => {

        if (!!id && !!reset_token) {

            api
                .post('hospitals/fastlogin', data)

                .then(response => {
                    var token = response.data.token;

                    loginHosp(
                        userDispatch,
                        token
                    );
                    history.push('/');
                })


                .catch(err => {
                    console.log(err);
                    toast.dark("Algo de Errado com seu ID ou Token");
                    history.push('/');
                    // setError(true);
                })
        }
    }
    )

    return (
        <div>
            <div className={classes.root}>
                <AppBar color='inherit' position="static">
                    <Toolbar>
                        <Link href="/">
                            <img src={MedirepoIcon} className={classes.img} alt="MediRepo" />
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography color='primary' component="h6" variant="button">
                        FAST LOGIN
                    </Typography>
                </div>

            </Container>
        </div >
    );
}

export default withRouter(FastLogin);