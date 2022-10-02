import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useUserDispatch, loginHosp } from "../../context/UserContext";
import api from "../../services/Api";
import AppBarMediRepo from "../components/AppBarMediRepo";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

function RegisterHospital() {
  var userDispatch = useUserDispatch();

  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [name, setName] = useState("");
  var [password, setPassword] = useState("");
  var [contraSenha, setContraSenha] = useState("");
  var [email, setEmail] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      password,
      email,
    };

    if (password !== contraSenha) {
      toast.warning("As senhas são diferentes");
    }

    if (!!name && password === contraSenha && !!email && !!password) {
      setIsLoading(true);
      try {
        const response = await api.post("hospitals", data);
        var token = response.data.token;

        loginHosp(userDispatch, token);
        setIsLoading(false);
        history.push("/");
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

        console.log(err);
      }
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ExitToAppIcon color="primary" />
          <Typography color="primary" component="h6" variant="h6">
            REGISTRO DE NOVO HOSPITAL
          </Typography>

          <Typography color="textSecondary" gutterBottom variant="body2">
            Use seu e-mail corporativo para criar uma nova conta
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleRegister}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome do Hospital"
              name="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="E-mail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contrasenha"
              label="Repita a senha"
              type="password"
              id="contrasenha"
              onChange={(e) => setContraSenha(e.target.value)}
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
                REGISTRAR
              </Button>
            )}
            <Grid alignItems="center" container>
              <Grid item>
                <Link href="/hospitals/login" variant="body2">
                  {"Já tem conta? Logar aqui"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(RegisterHospital);
