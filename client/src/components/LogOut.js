import React, {useContext, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";
import CountContext from "../countContext";

function LogOut(){
    const {setToken} = useContext(CountContext);
    const history = useHistory();

    useEffect(() => {
        setToken(null);
        history.push("/");
        // window.location.href = "/";

    }, [setToken]);


    // return <Redirect to="/"/>;
    return <div></div>
}

export default LogOut;
