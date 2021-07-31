import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Card, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../services/Api';
import { toast } from 'react-toastify';
import AppBarMediRepo from '../components/AppBarMediRepo';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
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
}));

function BulletinView() {

  const classes = useStyles();
  const token = localStorage.getItem("token");
  var [listBulletin, setlistBulletin] = useState([]);


  useEffect(() => {
    api
      .get("/patients/view", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        setlistBulletin([response.data.bulletin]);
      })
      .catch(error => {
        toast.dark("Autenticação necessária. Use o Login/Senha recebido.");

        if (error.response) {
          console.log(error.response.status);

        } else if (error.request) {
          console.log(error.request);

        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, [token]);


  return (
    <div>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardHeader titleTypographyProps={{ variant: 'h6' }} title="BOLETIM MÉDICO" subheader="Boletim Diário do Paciente" />


            {listBulletin.map(listBul => (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Nome"
                    name="Nome"
                    label="Nome do Paciente"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.nome} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dtnasc"
                    name="dtnasc"
                    type="date"
                    label="Data de Nascimento"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.dt_nascimento}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="geral"
                    name="gera"
                    label="Estado Geral"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.geral}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="pressao"
                    name="pressao"
                    label="Pressão Arterial"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.pressao}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="consciencia"
                    name="consciencia"
                    label="Nível de Consciencia"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.consciencia}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="febre"
                    name="febre"
                    label="Febre"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.febre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="respiracao"
                    name="respiracao"
                    label="Respiração"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.respiracao}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="diurese"
                    name="diurese"
                    label="Diurese"
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
                    label="Observações"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.obs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="medico"
                    name="medico"
                    label="Nome do Médico"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.medico}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="data"
                    name="data"
                    label="Data do Boletim"
                    fullWidth
                    type="date"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={listBul.dt_assinatura}
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