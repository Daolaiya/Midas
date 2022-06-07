import React, {useContext, useEffect} from "react";
import {Redirect } from "react-router-dom";
import CountContext from "../countContext";

function LogOut(){
    const {token, setToken} = useContext(CountContext);

    useEffect(() => {
        setToken(null);
    }, [token, setToken]);

    return <Redirect to="/"/>;
}

export default LogOut;
