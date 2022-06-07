import React, {useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import Back from './Back';
import CountContext from '../countContext';

function User() {
    const history = useHistory();
    const {token, currentUser} = useContext(CountContext);

    const [content, setContent] = useState(
        (<div>
            <h2> You must be logged in or Admin to see this page</h2>
            <button onClick={() => history.push("/login")}>Go to sign in</button>
        </div>)
    );
        
    useEffect(() => {
        async function getUser(){
            if (currentUser) {
                setContent (
                    (<div>
                        <h1>{currentUser.first_name}{currentUser.last_name}@{currentUser.username}</h1>
                        <h3><i>{currentUser.is_admin ? "Administrator" : "User"}</i></h3>
                        <h4>Email: {currentUser.email}</h4>
                        <hr/>
                        <Back/>
                    </div>)
                );
            }
        }

        try {
            getUser();
        } catch(error) {
            console.error("ERROR: ", error);
        }
    }, [token, currentUser]);

    return (
        <div>
            {content}
        </div>
    );
}

export default User;
