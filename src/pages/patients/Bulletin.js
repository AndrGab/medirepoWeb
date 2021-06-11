import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import MedirepoIcon from '../../assets/medirepo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useUserDispatch, logoutUser } from '../../context/UserContext'
import api from '../../services/Api';


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
  errormsg: {
    color: '#f72314',
    textAlign: 'center',
    marginTop: theme.spacing(5),


  },
  progress: {
    marginTop: theme.spacing(1),

  }

}));

function BulletinView() {

  var userDispatch = useUserDispatch();
  const history = useHistory();

  const classes = useStyles();
  const token = localStorage.getItem("token");
  var [listBulletin, setlistBulletin] = useState([]);


  useEffect(() => {
    async function fechData() {

      try {
        const response = await api.get("/pacients/view")
        setlistBulletin(response.data.bulletin);
      } catch (err) {
        console.log(err)
      }

    }
    fechData();
  });


  return (
    <div>
      <div className={classes.root}>
        <AppBar color='inherit' position="static">
          <Toolbar>
            <img src={MedirepoIcon} className={classes.img} alt="MediRepo" />
          </Toolbar>
        </AppBar>
      </div>
      <Container component="main" maxWidth="xl">
        <div className={classes.paper}>
          <ExitToAppIcon color='primary' />
          <Typography color='primary' component="h6" variant="button">
            BOLETIM MÉDICO
          </Typography>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          {listBulletin.map(listBul => (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="Nome"
                  name="Nome"
                  label="Nome do Paciente"
                  fullWidth
                  value={listBul.nome} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="dtnasc"
                  name="dtnasc"
                  label="Data de Nascimento"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="geral"
                  name="gera"
                  label="Estado Geral"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="pressao"
                  name="pressao"
                  label="Pressão Arterial"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="consciencia"
                  name="consciencia"
                  label="Nível de Consciencia"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="febre"
                  name="febre"
                  label="Febre"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="respiracao"
                  name="respiracao"
                  label="Respiração"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="diurese"
                  name="diurese"
                  label="Diurese"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="obs"
                  name="obs"
                  label="Observações"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="medico"
                  name="medico"
                  label="Nome do Médico"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="data"
                  name="data"
                  label="Data do Boletim"
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
        </div>

      </Container>
    </div>
  );
}

export default withRouter(BulletinView);