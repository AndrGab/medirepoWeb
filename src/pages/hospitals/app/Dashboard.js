import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useUserDispatch, signOut } from "../../../context/UserContext";
import api from "../../../services/Api";
import { toast } from "react-toastify";
import LogoImg from "../../../assets/Medicine-cuate.svg";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        paddingTop: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '10px',
    },
    img: {
        width: 150,
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

function Dashboard() {

    var userDispatch = useUserDispatch();
    const history = useHistory();
    const classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [name, setName] = useState("");
    const token = localStorage.getItem("token");


    useEffect(() => {
        setIsLoading(true);
        api
            .get("hospitals", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setName(response.data.hospital.name);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
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
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Card flexrow='true' className={classes.card}>


                        <img src={LogoImg} alt='MediRepo' />
                        <Typography align='center' variant='h6'> Bem-vindo, {name}</Typography>

                        <Typography align='center'>Sua plataforma de gerenciamento de boletins médicos </Typography>
                        
                        {isLoading && (
                            <LinearProgress className={classes.progress} />
                        )}
                    </Card>

                </div>
            </Container>
        </div>
    );
}

export default withRouter(Dashboard);
