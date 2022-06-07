import React, {useState, useEffect, useContext } from 'react';
import {useHistory } from 'react-router-dom';
import MidasApi from '../api';
import CountContext from '../countContext';

function Profile() {
    const history = useHistory();
    const {token, currentUser} = useContext(CountContext);

    // State variables
    const initialState = {username:"", first_name:"", last_name:"", email:""};
    const [userData, setUserData] = useState(initialState);

    const handleChange = evt => {
        const {name, value } = evt.target;
        setUserData(fData => ({...fData, [name]: value }));
    };

    // Submit event handler
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        MidasApi.token = token;
        await MidasApi.request(`users/${userData.username}`, {first_name: userData.first_name, last_name: userData.last_name, email: userData.email}, "patch");
        // This is clunky
        history.push(`/users/${userData.username}`);
    };

    useEffect(() => {
        if (currentUser) setUserData(currentUser);
    }, [currentUser]);

    if (!currentUser){
        return (
            <div> 
                <h3>You must sign in to see profile.</h3>
                <button onClick={() => history.push("/login")}>Go to sign in</button>
            </div>
        );
    }

    // Actual form
    return (
        <div>
            <h3>Profile</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <span id="username" name="username">{userData.username}</span>
                    <hr/>
                </div>
                <div>
                    <label htmlFor="first_name">First _name: </label>
                    <input id="first_name" name="first_name" value={userData.first_name}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="last_name">Last _name: </label>
                    <input type="ast_name" id="last_name" name="last_name" value={userData.last_name}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" name="email" value={userData.email}onChange={handleChange}/>
                </div>
                <div>
                    <p>Enter password to confirm changes</p>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" onChange={handleChange}required/>
                </div>
                <div>
                    <button>Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
