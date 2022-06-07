import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import CountContext from "../countContext";

function PrivateRoute({exact, path, children}) {
    console.log("PATH CAUGHT IS: ", path, "EXACT IS:", exact, "CHILDREN: ", children);
    const {currentUser} = useContext(CountContext);

    console.debug("PrivateRoute", "exact=", exact, "path=", path, "currentUser=", currentUser);

    if (!currentUser) {
            return <Redirect to="/login"/>;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;
