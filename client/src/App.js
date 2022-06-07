import React, {useState, useEffect} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import jwt from "jsonwebtoken";

import MidasApi from "./api";
import CountContext from "./countContext";
import Routes from "./components/Routes";
import Navigation from "./components/Navigation";
import useLocalStorage from "./components/useLocalStorage";
import logo from "./Logo.png";

import "./css/App.css";

export const TOKEN_STORAGE_ID = "midas-token";

function App() {
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
    const [currentUser, setCurrentUser] = useState(jwt.decode(token));

    useEffect(() => {
        console.debug("App useEffect loadUserInfo", "token=", token);

        async function getCurrentUser() {
            try {
                let {username} = jwt.decode(token);
                MidasApi.token = token;
                let currentUser = await MidasApi.getUser(username);
                setCurrentUser(currentUser);
            } catch (err) {
                console.error("App loadUserInfo: problem loading", err);
                setCurrentUser(null);
            }
        }

        if (token) {
            getCurrentUser();
        }
    }, [token]);

  return (
    <div className="app-div">
        <BrowserRouter>
            <CountContext.Provider value={{currentUser, setCurrentUser, token, setToken}}>
                <div className="website-title-div">
                    <img className="logo" alt="Logo" src={logo}/>
                    <Link to="/">
                        <h1 className="website-title">Midas Movies</h1>
                    </Link>
                </div>
                <div className="navigation-div">
                    <Navigation/>
                </div>
                <div>
                    <Routes/>
                </div>
            </CountContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
