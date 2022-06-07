import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import CountContext from "../countContext";

import "../css/Navigation.css";

function Navigation() {
    const {currentUser} = useContext(CountContext);

    if (currentUser){
        return (
            <nav className="NavBar">
                <NavLink exact to="/">
                    Home
                </NavLink>
                <NavLink exact to="/favorites">
                    Favorites
                </NavLink>
                <NavLink exact to="/profile">
                    Profile
                </NavLink>
                <NavLink exact to="/logout">
                    {`Log out @${currentUser.username}`}
                </NavLink>
            </nav>
        );
    } else {
        return (
            <nav className="NavBar">
                <NavLink exact to="/">
                    Home
                </NavLink>
                <NavLink exact to="/login">
                    Log in
                </NavLink>
                <NavLink exact to="/register">
                    Register
                </NavLink>
            </nav>
        );
    }
}

export default Navigation;
