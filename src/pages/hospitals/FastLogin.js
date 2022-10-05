import React, { useEffect } from "react";
import { useHistory, withRouter, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useUserDispatch, loginHosp } from "../../context/UserContext";
import api from "../../services/Api";
import AppBarMediRepo from "../components/AppBarMediRepo";
import { useTranslation } from "react-i18next";
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
}));

function FastLogin() {
  var userDispatch = useUserDispatch();

  const classes = useStyles();
  var { id, resetToken } = useParams();

  var reset_token = resetToken;

  const history = useHistory();

  const { t } = useTranslation();

  const data = {
    id,
    reset_token,
  };

  useEffect(() => {
    if (!!id && !!reset_token) {
      api
        .post("hospitals/fastlogin", data)

        .then((response) => {
          var token = response.data.token;

          loginHosp(userDispatch, token);
          history.push("/");
        })

        .catch((err) => {
          console.log(err);
          toast.dark(t("wrongIDOrToken"));
          history.push("/");
        });
    }
  });

  return (
    <div>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography color="primary" component="h1" variant="h4">
            Fast Login
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(FastLogin);
