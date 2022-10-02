import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        {darkMode ? (
          <img className={classes.img} src={MedirepoIconW} alt="Medirepo" />
        ) : (
          <img className={classes.img} src={MedirepoIconB} alt="Medirepo" />
        )}
        <Typography variant="h6" className={classes.title}>
          Boletim Médico
        </Typography>
        {isAuthenticated && (
          <Button
            onClick={(e) => signOut(userDispatch, history)}
            color="inherit"
          >
            Sair
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default withRouter(AppBarMediRepo);
