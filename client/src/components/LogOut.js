import React, {useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import CountContext from "../countContext";

function LogOut(){
    const {setToken, setCurrentUser} = useContext(CountContext);


    useEffect(() => {
        setToken(null);
        setCurrentUser(null);

    }, [setToken]);

    return <Redirect to="/"/>;
}

export default LogOut;
