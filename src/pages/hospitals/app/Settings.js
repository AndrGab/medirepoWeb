import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import api from "../../../services/Api";
import { toast } from "react-toastify";
import { useUserDispatch, signOut } from "../../../context/UserContext";
import { useDarkState } from "../../../context/ThemeContext";
import { CardHeader, Box, Switch, Icon, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
  card: {
    width: "100%",
    paddingTop: "0px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "10px",
  },
  cardheader: {
    h5: "10px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    width: "120px",
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

function Settings() {
  var userDispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [password, setPassword] = useState("");
  var [contraSenha, setContraSenha] = useState("");
  const token = localStorage.getItem("token");
  const { state, dispatch } = useDarkState();
  const { darkMode } = state;
  const onClick = () => {
    if (darkMode) {
      dispatch({ type: "LIGHTMODE" });
    } else {
      dispatch({ type: "DARKMODE" });
    }
  };
  const { t } = useTranslation();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      password,
    };

    if (password !== contraSenha) {
      toast.warning(t("differentPassword"));
    }

    if (password === contraSenha && !!password) {
      setIsLoading(true);
      try {
        await api.put("hospitals", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        toast.success(t("updatedPassword"));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (!!err.response.data.message.email) {
          toast.warning(t("emailSavingError"));
        }
        if (!!err.response.data.message.name) {
          toast.warning(t("nameSize"));
        }
        if (!!err.response.data.message.password) {
          toast.warning(t("passwordSize"));
        }
        if (err.response.status === 401) {
          toast.warning(t("accessDenied"));
          signOut(userDispatch, history);
        }

        console.log(err);
      }
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={handleRegister}>
            <Card className={classes.card}>
              <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                title={t("password")}
                subheader={t("dataUpdate")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
                label={t("password")}
                type="password"
                id="new-password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="contrasenha"
                label={t("repeatPassword")}
                type="password"
                id="contrasenha"
                autoComplete="password"
                onChange={(e) => setContraSenha(e.target.value)}
              />
              {isLoading ? (
                <LinearProgress className={classes.progress} />
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {t("update")}
                    </Button>
                  </Box>
                </>
              )}
            </Card>
          </form>
        </div>
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardHeader
              titleTypographyProps={{ variant: "h6" }}
              title={t("darkMode")}
              subheader={t("viewSettings")}
            />
            <Grid
              container
              direction="row"
              justifyContent="left"
              alignItems="center"
            >
              <Switch
                checked={darkMode}
                color="primary"
                onChange={onClick}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Icon> {darkMode ? "dark_mode" : "light_mode"}</Icon>
            </Grid>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Settings);
