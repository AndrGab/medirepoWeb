import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import image from '../assets/Monster404.svg';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import RouterLink from '../components/RouterLink/RouterLink';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '30%',
    marginRight: theme.spacing(2),
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function NotFound() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.div}>
        <img alt="Page not Found" src={image} className={classes.img} />
      </div>

      <Grid alignItems="center" direction="column" justifyContent="center" container>
        <Grid item xs>
          <RouterLink to="/">
            {t('medicalReport')}
          </RouterLink>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(NotFound);
