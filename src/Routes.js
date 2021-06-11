import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useUserState } from "./context/UserContext";
import Bulletin from './pages/patients/Bulletin';
import Login from "./pages/patients/Login";


export default function Routes() {

    var { isAuthenticated } = useUserState();

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/pacients/bulletin" />} />
                <PrivateRoute path="/app" component={Bulletin} />

                <PrivateRoute path="/pacients/bulletin" component={Bulletin} />
                <PublicRoute path="/pacients/login" component={Login} />
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
                                pathname: "/pacients/login",
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
                                    pathname: "/pacients/bulletin",
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


