import React, {useState, useContext} from "react";
import {useHistory } from "react-router-dom";
import MidasApi from "../api";
import CountContext from "../countContext";
import Alert from "./Alert";

function LogIn(){
    const history = useHistory();
    const {setToken} = useContext(CountContext);

    const initialState = {username: "", password: "" };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = evt => {
        const {name, value } = evt.target;
        setFormData(fData => ({...fData, [name]: value }));
    };

    async function doLogin(loginData){
        try {
            let token = await MidasApi.login(loginData);
            return {success: true, token };
        } catch (errors) {
            console.error("login failed", errors);
            return {success: false, errors };
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const result = await doLogin(formData);

        if (result.success){
            setFormData(initialState);
            setToken(result.token);
            history.push(`/`);
        } else {
            setFormErrors(result.errors);
        }
    };

    return (
        <div>
            {formErrors.length ? <Alert type="danger" messages={formErrors}/> : null}
            <h3>Log in below:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" value={formData.username}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={formData.password}onChange={handleChange}/>
                </div>
                <button>Log in</button>
            </form>
        </div>
    );
}

export default LogIn;
