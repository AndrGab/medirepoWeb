import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useUserState } from "./context/UserContext";
import Bulletin from './pages/patients/Bulletin';
import Login from "./pages/patients/Login";
import LoginHosp from "./pages/hospitals/Login";
import Teste from "./pages/patients/teste";
import ResetToken from "./pages/hospitals/ResetToken";
import FastLogin from "./pages/hospitals/FastLogin";
import RegisterHosp from "./pages/hospitals/Register";


export default function Routes() {

    var { isAuthenticated } = useUserState();
    var token_id = localStorage.getItem("token_id")

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/patients/login" />} />

                <PrivateRoute path="/patients/bulletin" component={Bulletin} />
                <PrivateRoute path="/hospitals/logged" component={Teste} />

                <PublicRoute path="/patients/login" component={Login} />
                <PublicRoute path="/hospitals/login" component={LoginHosp} />
                <PublicRoute path="/hospitals/reset" component={ResetToken} />
                <PublicRoute path="/hospitals/register" component={RegisterHosp} />
                <PublicRoute path="/hospitals/fastlogin/:id/:resetToken" component={FastLogin} />


            </Switch>
        </BrowserRouter>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: (token_id === "1") ? "/patients/login" : "/hospitals/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (


            < Route
                {...rest}
                render={
                    props =>
                        isAuthenticated ? (
                            < Redirect
                                to={{
                                    pathname: (token_id === "1") ? "/patients/bulletin" : "/hospitals/logged",
                                }}
                            />
                        ) : (
                            React.createElement(component, props)
                        )
                }
            />
        );
    }
}


