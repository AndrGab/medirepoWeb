import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useUserState } from "./context/UserContext";
import teste from './pages/patients/teste'

import Login from "./pages/patients/Login";


export default function Routes() {

    var { isAuthenticated } = useUserState();

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app" />} />
                <PrivateRoute path="/app" component={teste} />
                <PublicRoute path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        console.log({ component })
        console.log({ ...rest })
        console.log(isAuthenticated)
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
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
        console.log({ component })
        console.log({ ...rest })
        console.log(isAuthenticated)

        return (


            < Route
                {...rest}
                render={
                    props =>
                        isAuthenticated ? (
                            < Redirect
                                to={{
                                    pathname: "/app",
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


