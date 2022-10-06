import React, { useState } from "react";
import i18n from "i18next";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import MedirepoIconW from "../../assets/medirepo-white.png";
import MedirepoIconB from "../../assets/medirepo-black.png";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  useUserDispatch,
  signOut,
  useUserState,
} from "../../context/UserContext";
import { useDarkState } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { localesList } from "../../i18n";

const useStyles = makeStyles((theme) => ({
  img: {
    width: 100,
    marginRight: theme.spacing(4),
    padding: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBarMediRepo(props) {
  const { state } = useDarkState();
  const { darkMode } = state;
  var userDispatch = useUserDispatch();
  var { isAuthenticated } = useUserState();
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        {darkMode ? (
          <img className={classes.img} src={MedirepoIconW} alt="Medirepo" />
        ) : (
          <img className={classes.img} src={MedirepoIconB} alt="Medirepo" />
        )}
        <Typography variant="h6" className={classes.title}>
          {t("medicalReport")}
        </Typography>
        <IconButton
          aria-label="Language"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <TranslateIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          {localesList.map((localesList) => (
            <MenuItem
              key={localesList.locale}
              onClick={() => handleLanguage(localesList.locale)}
            >
              {localesList.description}
            </MenuItem>
          ))}
        </Menu>
        {isAuthenticated && (
          <Button
            onClick={(e) => signOut(userDispatch, history)}
            color="inherit"
          >
            {t("logout")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default withRouter(AppBarMediRepo);
