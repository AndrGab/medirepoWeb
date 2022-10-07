import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Card, CardHeader, Box, CircularProgress } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useUserDispatch, signOut } from '../../../context/UserContext';
import api from '../../../services/Api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    paddingTop: '0px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
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
    width: '120px',
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

function Account() {
  var userDispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  const token = localStorage.getItem('token');

  const { t } = useTranslation();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    if (!!name && !!email) {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      try {
        await api.put('hospitals', data, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setIsLoading(false);
        toast.success('Done!');
      } catch (err) {
        setIsLoading(false);

        if (!!err.response.data.message.email) {
          toast.warning(t('emailSavingError'));
        }
        if (!!err.response.data.message.name) {
          toast.warning(t('nameSize'));
        }
        if (!!err.response.data.message.password) {
          toast.warning(t('passwordSize'));
        }

        if (err.response.status === 401) {
          toast.warning(t('accessDenied'));
          signOut(userDispatch, history);
        }

        console.log(err);
      }
    }
  }

  useEffect(() => {
    setDataLoading(true);
    api
      .get('hospitals', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setName(response.data.hospital.name);
        setEmail(response.data.hospital.email);
        setDataLoading(false); // seting data loader to false after fetching data from API
      })
      .catch((error) => {
        if (error.response) {
          toast.warning(t('accessDenied'));
          signOut(userDispatch, history);
        }
      });
  }, [token, history, userDispatch, t]);

  return (
    <div>
      <Container component="main">
        <div className={classes.paper}>
          {dataLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <form className={classes.form} noValidate onSubmit={handleRegister}>
              <Card className={classes.card}>
                <CardHeader titleTypographyProps={{ variant: 'h6' }} title={t('hospitalInfo')} subheader={t('dataUpdate')} />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label={t('hospitalName')}
                  name="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label={t('email')}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {isLoading ? (
                  <LinearProgress className={classes.progress} />
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                      }}
                    >
                      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {t('update')}
                      </Button>
                    </Box>
                  </>
                )}
              </Card>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Account);
