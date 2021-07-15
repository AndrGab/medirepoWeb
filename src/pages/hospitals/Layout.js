import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory, Route, Switch, useLocation, Link as RouterLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MedirepoIcon from "../../assets/medirepo.png";
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useUserDispatch, signOut, useUserState} from '../../context/UserContext'
import Icon from "@material-ui/core/Icon";
import SettingsPage from './app/Settings';
import AccountPage from './app/Account';
import DashboardPage from './app/Dashboard';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    img: {
        width: 150,
        marginRight: theme.spacing(2),

    },
}));


export default function Layout() {
    var userDispatch = useUserDispatch();
    var { isAuthenticated } = useUserState();
    const { pathname } = useLocation();
    const tokenID = localStorage.getItem("token_id");
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [auth, setAuth] = useState(true);

    useEffect (()=> {

        setAuth(isAuthenticated);

    }, [isAuthenticated]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="inherit"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={MedirepoIcon} className={classes.img} alt="MediRepo" />
                    <Typography variant="h6" noWrap>
                        Gerenciamento de Boletins Médicos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <Divider />
                <List>
                    {[
                        { url: "dashboard", text: "Dashboard", icon: "dashboard" },
                        { url: "bulletim", text: "Boletins", icon: "assignment" },
                        { url: "account", text: "Conta", icon: "person" },
                        { url: "settings", text: "Configurações", icon: "settings" },
                    ].map(({ url, text, icon }, index) => (
                        <ListItem
                            component={RouterLink}
                            selected={pathname === `/${url}`}
                            to={`/hospitals/app/${url}`}
                            button
                            key={text}
                        >
                            <ListItemIcon>
                                <Icon>{icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    <ListItem button key='Sair' onClick={e => signOut(userDispatch, history)} >
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary='Sair' />
                    </ListItem>

                </List>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                { auth &&  !!tokenID ? (
                
                <Switch>
                    <Route
                        exact
                        path="/hospitals/app/dashboard"
                        render={DashboardPage}
                    />
                    <Route
                        exact
                        path="/hospitals/app/bulletim"
                        render={() => <h1>boletins</h1>}
                    />
                    <Route
                        exact
                        path="/hospitals/app/settings"
                        render={SettingsPage}
                    />
                    <Route
                        exact
                        path="/hospitals/app/account"
                        render={AccountPage}
                    />
                    
                </Switch>
                ) : 
                (   signOut(userDispatch, history))}

            </main>
        </div>
    );
}