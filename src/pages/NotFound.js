import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import image from '../assets/Monster404.svg';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';

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
          <Link component={RouterLink} to="/" variant="body2">
            {t('medicalReport')}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(NotFound);
