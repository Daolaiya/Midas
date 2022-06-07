import {Route, Switch} from "react-router-dom";
import React from "react";

import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Profile from "./Profile";
import LogIn from "./LogIn";
import Register from "./Register";
import User from "./User";
import LogOut from "./LogOut";
import Favorites from "./Favorites";

function Routes(){
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <LogIn/>
                </Route>
                <PrivateRoute exact path="/logout">
                    <LogOut/>
                </PrivateRoute>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <PrivateRoute exact path="/profile">
                    <Profile/>
                </PrivateRoute>
                <PrivateRoute exact path="/favorites">
                    <Favorites/>
                </PrivateRoute>
                <PrivateRoute exact path="/users/:username">
                    <User/>
                </PrivateRoute>
            </Switch>
        </div>
    );
}

export default Routes;
