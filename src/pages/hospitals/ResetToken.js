import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../../services/Api";
import { toast } from "react-toastify";
import AppBarMediRepo from "../components/AppBarMediRepo";
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

function ResetToken() {
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [email, setEmail] = useState("");
  const { t } = useTranslation();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
    };

    if (!!email) {
      setIsLoading(true);
      try {
        const response = await api.post("hospitals/reset", data);
        setIsLoading(false);
        toast.success(t("accessTokenSent"));
        console.log(response.data.message);
      } catch (err) {
        console.log(err);
        toast.dark(t("wrongEmail"));
        setIsLoading(false);
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
          <VpnKeyIcon color="primary" />
          <Typography color="primary" component="h6" variant="button">
            RESET PASSWORD TOKEN
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("email")}
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
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
                {t("send")}
              </Button>
            )}
            <Grid alignItems="center" container>
              <Grid item>
                <Link href="/hospitals/login" variant="body2">
                  {t("hospitalLogin")}
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
