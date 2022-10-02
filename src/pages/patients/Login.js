import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useUserDispatch, loginUser } from "../../context/UserContext";
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

const notify = () =>
  toast.info(
    "O Login e Senha são informados no momento da internação. Procure a Recepção do Hospital"
  );

function SignIn() {
  var userDispatch = useUserDispatch();

  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [login, setCodpac] = useState("");
  var [password, setPassword] = useState("");
  var [dt_nasc, setDtnasc] = useState("");
  var [id, setHospital] = useState("");
  var [listHosps, setlistHosp] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api
      .get("/hospitals/list")
      .then((response) => {
        setlistHosp(response.data.hospital);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Não foi possível carregar a lista de Hospitais. Tente mais tarde."
        );
      });
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      login,
      password,
      dt_nasc,
      id,
    };

    if (!!login && !!password && !!dt_nasc && !!id) {
      setIsLoading(true);
      try {
        const response = await api.post("patients/signin", data);
        var token = response.data.token;

        loginUser(userDispatch, token);
        setIsLoading(false);
        history.push("/patients/bulletin");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.dark("Algo de errado com o Login ou Senha");
      }
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>{" "}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ExitToAppIcon color="primary" />
          <Typography color="primary" component="h6" variant="button">
            LOGIN{" "}
          </Typography>{" "}
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cod_pac"
              label="Código do Paciente"
              name="cod_pac"
              autoFocus
              onChange={(e) => setCodpac(e.target.value)}
            />{" "}
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
            />{" "}
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
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel
                htmlFor="nascimento"
                id="simple-select-outlined-label"
              >
                Hospital{" "}
              </InputLabel>
              <Select
                labelId="simple-select-outlined-label"
                id="simple-select-outlined"
                native
                required
                inputProps={{
                  name: "hospital",
                  id: "hospital_id",
                }}
                input={
                  <OutlinedInput
                    shrink="true"
                    labelWidth={62}
                    name="hospital"
                    id="simple-select-outline"
                  />
                }
                onChange={(e) => setHospital(e.target.value)}
              >
                <option aria-label="None" value="" />
                {listHosps.map((listHosp) => (
                  <option value={listHosp.id}> {listHosp.name} </option>
                ))}
              </Select>
            </FormControl>
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
                ACESSAR{" "}
              </Button>
            )}{" "}
            <Grid alignItems="center" container>
              <Grid item xs>
                <Link href="#" onClick={notify} variant="body2">
                  Esqueceu a Senha ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/hospitals/login" variant="body2">
                  Login para Hospitais, clique aqui{" "}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>{" "}
    </div>
  );
}
export default withRouter(SignIn);
