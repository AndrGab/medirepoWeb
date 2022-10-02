import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useUserDispatch, loginHosp } from "../../context/UserContext";
import api from "../../services/Api";
import { toast } from "react-toastify";
import AppBarMediRepo from "../components/AppBarMediRepo";

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

function Login() {
  var userDispatch = useUserDispatch();
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    if (!!email && !!password) {
      setIsLoading(true);
      try {
        const response = await api.post("hospitals/signin", data);
        var token = response.data.token;

        loginHosp(userDispatch, token);
        setIsLoading(false);
        history.push("/");
      } catch (err) {
        console.log(err);
        toast.dark("Algo de errado com seu e-mail ou senha");
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ExitToAppIcon color="primary" />
          <Typography color="primary" component="h6" variant="button">
            LOGIN
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
                ACESSAR
              </Button>
            )}
            <Grid alignItems="center" container>
              <Grid item xs={12}>
                <Link href="/hospitals/reset" variant="body2">
                  Esqueceu a Senha?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="/hospitals/register" variant="body2">
                  Cadastrar Novo Hospital
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="/patients/login" variant="body2">
                  Login para Pacientes, clique aqui
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Login);
