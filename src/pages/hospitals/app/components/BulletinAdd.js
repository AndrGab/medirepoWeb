import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { TextField, Card, CardHeader, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../../../services/Api';
import { toast } from 'react-toastify';
import { useUserDispatch, signOut } from '../../../../context/UserContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(0),
    minWidth: 120,
  },

  card: {
    paddingTop: '0px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  submit: {
    width: '120px',
    margin: theme.spacing(1, 0, 0),
  },
}));

function BulletinAdd() {
  var [isLoading, setIsLoading] = useState(false);
  var userDispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();
  const token = localStorage.getItem('token');
  var [name, setNome] = useState('');
  var [dt_birth, setDtnasc] = useState('');
  var [general, setGeral] = useState('');
  var [pressure, setPressao] = useState('');
  var [conscience, setConsciencia] = useState('');
  var [fever, setFebre] = useState('');
  var [respiration, setRespiracao] = useState('');
  var [diurese, setDiurese] = useState('');
  var [notes, setObs] = useState('');
  var [doctor, setMedico] = useState('');
  var [dt_signature, setDtassinatura] = useState('');
  var [attendance, setAtendime] = useState(0);
  var [cd_patient, setCodpac] = useState(0);

  const { t } = useTranslation();

  async function handleRegisterBulletin(e) {
    e.preventDefault();

    const data = {
      name,
      dt_birth,
      general,
      pressure,
      conscience,
      fever,
      respiration,
      diurese,
      notes,
      doctor,
      dt_signature,
      attendance,
      cd_patient,
    };

    if (!!attendance && !!cd_patient) {
      setIsLoading(true);
      try {
        const response = await api.post('bulletins', data, {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (response.status === 201) {
          setIsLoading(false);
          toast.success(t('bulletinCreated'));
        }
      } catch (err) {
        setIsLoading(false);
        if (!!err.response.data.message.attendance) {
          toast.warning(t('numberAttendanceCode'));
        }
        if (!!err.response.data.message.cd_patient) {
          toast.warning(t('numberPatientCode'));
        }
        if (!!err.response.data.message.name) {
          toast.warning(t('nameSize'));
        }
        if (!!err.response.data.message.conscience) {
          toast.warning(t('consciousnessLevelBlank'));
        }
        if (!!err.response.data.message.diurese) {
          toast.warning(t('diuresisBlank'));
        }
        if (!!err.response.data.message.fever) {
          toast.warning(t('feverBlank'));
        }
        if (!!err.response.data.message.general) {
          toast.warning(t('generalConditionBlank'));
        }
        if (!!err.response.data.message.doctor) {
          toast.warning(t('doctorNameBlank'));
        }
        if (!!err.response.data.message.pressure) {
          toast.warning(t('bloodPressureBlank'));
        }
        if (!!err.response.data.message.respiration) {
          toast.warning(t('respirationBlank'));
        }
        if (!!err.response.data.message.notes) {
          toast.warning(t('obsSize'));
        }
        if (!!err.response.data.message.dt_birth) {
          toast.warning(t('birthdayBlank'));
        }
        if (err.response.status === 401) {
          toast.warning(t('accessDenied'));
          signOut(userDispatch, history);
        }

        console.log(err);
      }
    } else {
      toast.error(t('fillPatCodeAndAttendance'));
    }
  }

  function getActualDate() {
    var newDate = new Date();
    var newDay = newDate.getDate();
    var newMonth = newDate.getMonth() + 1;
    var newYear = newDate.getFullYear();
    if (newDay < 10) {
      newDay = '0' + newDay;
    }
    if (newMonth < 10) {
      newMonth = '0' + newMonth;
    }
    newDate = `${newYear}-${newMonth}-${newDay}`;
    return newDate;
  }

  useEffect(() => {
    const date = getActualDate();
    setDtassinatura(date);
  }, []);

  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardHeader titleTypographyProps={{ variant: 'h6' }} title={t('medicalReport')} />
            <form className={classes.form} noValidate onSubmit={handleRegisterBulletin}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="codpac"
                    label={t('patientCode')}
                    name="codpac"
                    autoFocus
                    onChange={(e) => setCodpac(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="atendime"
                    label={t('attendanceCode')}
                    name="atendime"
                    onChange={(e) => setAtendime(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="data_nasc"
                    label={t('birthday')}
                    type="date"
                    id="data_nasc"
                    autoComplete={t('birthday')}
                    onChange={(e) => setDtnasc(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label={t('patientName')}
                    name="nome"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('generalCondition')} id="simple-select-outlined-label">
                      {t('generalCondition')}{' '}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('generalCondition'),
                        id: 'geral',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={92} name="geral" id="simple-select-outline" />}
                      onChange={(e) => setGeral(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('normal')}> {t('normal')} </option>
                      <option value={t('serious')}> {t('serious')} </option>
                      <option value={t('stable')}> {t('stable')} </option>
                      <option value={t('good')}> {t('good')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('bloodPressure')} id="simple-select-outlined-label">
                      {t('bloodPressure')}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('bloodPressure'),
                        id: 'pressao',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={120} name="pressao" id="simple-select-outline" />}
                      onChange={(e) => setPressao(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('normal')}> {t('normal')} </option>
                      <option value={t('high')}> {t('high')} </option>
                      <option value={t('low')}> {t('low')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('consciousnessLevel')} id="simple-select-outlined-label">
                      {t('consciousnessLevel')}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('conciousnessLevel'),
                        id: 'consciencia',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={150} name="consciencia" id="simple-select-outline" />}
                      onChange={(e) => setConsciencia(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('conscious')}> {t('conscious')} </option>
                      <option value={t('sedated')}> {t('sedated')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('fever')} id="simple-select-outlined-label">
                      {t('fever')}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('fever'),
                        id: 'febre',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={45} name="febre" id="simple-select-outline" />}
                      onChange={(e) => setFebre(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('absent')}> {t('absent')} </option>
                      <option value={t('present')}> {t('present')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('respiration')} id="simple-select-outlined-label">
                      {t('respiration')}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('respiration'),
                        id: 'respiracao',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={85} name="respiracao" id="simple-select-outline" />}
                      onChange={(e) => setRespiracao(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('normal')}> {t('normal')} </option>
                      <option value={t('byDevices')}> {t('byDevices')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel htmlFor={t('diuresis')} id="simple-select-outlined-label">
                      {t('diuresis')}
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      native
                      required
                      inputProps={{
                        name: t('diuresis'),
                        id: 'diurese',
                      }}
                      input={<OutlinedInput shrink="true" labelWidth={62} name="diurese" id="simple-select-outline" />}
                      onChange={(e) => setDiurese(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={t('increased')}>{t('increased')}</option>
                      <option value={t('diminished')}> {t('diminished')} </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="obs"
                    label={t('observations')}
                    name="obs"
                    onChange={(e) => setObs(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="medico"
                    label={t('doctorName')}
                    name="medico"
                    onChange={(e) => setMedico(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="data"
                    label={t('signedAt')}
                    InputProps={{
                      readOnly: true,
                    }}
                    id="dt_assinatura"
                    value={dt_signature}
                    autoComplete={t('signedAt')}
                    onChange={(e) => setDtassinatura(e.target.value)}
                  />
                </Grid>
              </Grid>
              {isLoading ? (
                <LinearProgress className={classes.progress} />
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2,
                  }}
                >
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {t('add')}
                  </Button>
                </Box>
              )}
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(BulletinAdd);
