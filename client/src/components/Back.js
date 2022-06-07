// This is a button that redirects to the previous page

import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "reactstrap";

function Back(){
    const history = useHistory();

    return (
        <div style={{display:"inline"}}>
            <Button onClick={history.goBack}style={{backgroundColor:"black", color:"white", fontFamily:"calibri"}}>
                Go Back
            </Button>
        </div>
    );
}

export default Back;
