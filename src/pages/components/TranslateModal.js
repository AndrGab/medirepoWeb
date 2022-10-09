import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TranslateIcon from '@material-ui/icons/Translate';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 640,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: '10px',
    width: '100px',
    cursor: 'pointer',
  },
}));

function TranslateModal({ localesList, onClick }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeLang = (language) => {
    onClick(language);
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="Language" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpen} color="inherit">
        <TranslateIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Select Language</h2>
          <div>
            {localesList.map((localesList) => (
              <Button variant="outlined" key={localesList.locale} onClick={() => handleChangeLang(localesList.locale)} className={classes.button}>
                {localesList.description}
              </Button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TranslateModal;
