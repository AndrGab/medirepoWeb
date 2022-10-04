import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { TextField, Card, CardHeader } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../../../../services/Api";
import { toast } from "react-toastify";
import { useUserDispatch, signOut } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  img: {
    width: 100,
    marginRight: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

function BulletinView(props) {
  const { bulletinId } = props;
  var userDispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();
  const token = localStorage.getItem("token");
  var [listBulletin, setlistBulletin] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/bulletins/" + bulletinId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setlistBulletin([response.data.bulletin]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 401) {
            toast.warning(t("accessDenied"));
            signOut(userDispatch, history);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [token, bulletinId, userDispatch, history, t]);

  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardHeader
              titleTypographyProps={{ variant: "h6" }}
              title={t("medicalReport")}
              subheader={t("dailyMedicalReport")}
            />

            {listBulletin.map((listBul) => (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Nome"
                    name="Nome"
                    label={t("patientName")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dtnasc"
                    name="dtnasc"
                    type="date"
                    label={t("birthday")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.dt_birth}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="geral"
                    name="geral"
                    label={t("generalCondition")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.general}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="pressao"
                    name="pressao"
                    label={t("bloodPressure")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.pressure}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="consciencia"
                    name="consciencia"
                    label={t("consciousnessLevel")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.conscience}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="febre"
                    name="febre"
                    label={t("fever")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.fever}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="respiracao"
                    name="respiracao"
                    label={t("respiration")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.respiration}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="diurese"
                    name="diurese"
                    label={t("diuresis")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.diurese}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="obs"
                    name="obs"
                    label={t("observations")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.notes}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="medico"
                    name="medico"
                    label={t("doctorName")}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.doctor}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="data"
                    name="data"
                    label={t("signedAt")}
                    fullWidth
                    type="date"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.dt_signature}
                  />
                </Grid>
              </Grid>
            ))}
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(BulletinView);
