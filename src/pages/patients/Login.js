import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useUserDispatch, loginUser } from '../../context/UserContext';
import api from '../../services/Api';
import { toast } from 'react-toastify';
import AppBarMediRepo from '../components/AppBarMediRepo';
import { useTranslation } from 'react-i18next';
import RouterLink from '../../components/RouterLink/RouterLink';
import { Alert } from '@material-ui/lab';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 100,
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
  progress: {
    marginTop: theme.spacing(1),
  },
}));

function SignIn() {
  var userDispatch = useUserDispatch();

  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [login, setCodpac] = useState('');
  var [password, setPassword] = useState('');
  var [dt_nasc, setDtnasc] = useState('');
  var [id, setHospital] = useState('');
  var [listHosps, setlistHosp] = useState([]);
  const { t } = useTranslation();
  const notify = () => toast.info(t('askPatientLogin'));
  const [isFormInComplete, setIsFormInComplete] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .get('/hospitals/list')
      .then((response) => {
        setlistHosp(response.data.hospital);
      })
      .catch((err) => {
        console.log(err);
        toast.error(t('loadHospitalsError'));
      });
  }, [t]);

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      login,
      password,
      dt_nasc,
      id,
    };

    if (!!login && !!password && !!dt_nasc && !!id) {
      setIsFormInComplete(false);
      setIsLoading(true);
      try {
        const response = await api.post('patients/signin', data);
        var token = response.data.token;

        loginUser(userDispatch, token);
        setIsLoading(false);
        history.push('/patients/bulletin');
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.dark(t('authenticationRequired'));
      }
    } else {
      setIsFormInComplete(true);
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBarMediRepo />
      </div>{' '}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography color="primary" component="h1" variant="button">
            PATIENT LOGIN
          </Typography>

          {/* Show alert if the required inputs are incomplete */}
          {isFormInComplete && (
            <Box width="100%" mt={3}>
              <Alert severity="error">{t('fillRequiredFields')}</Alert>
            </Box>
          )}

          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cod_pac"
              label={t('patientCode')}
              name="cod_pac"
              autoFocus
              onChange={(e) => setCodpac(e.target.value)}
            />{' '}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label={t('password')}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />{' '}
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
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="nascimento" id="simple-select-outlined-label">
                Hospital
              </InputLabel>
              <Select
                labelId="simple-select-outlined-label"
                id="simple-select-outlined"
                native
                required
                inputProps={{
                  name: 'hospital',
                  id: 'hospital_id',
                }}
                input={<OutlinedInput shrink="true" labelWidth={62} name="hospital" id="simple-select-outline" />}
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
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {t('login')}
              </Button>
            )}{' '}
            <Grid alignItems="center" container>
              <Grid item xs>
                <RouterLink to="#" onClick={notify}>
                  {t('forgotPassword')}?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/hospitals/login">{t('hospitalLogin')}</RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>{' '}
    </div>
  );
}
export default withRouter(SignIn);
