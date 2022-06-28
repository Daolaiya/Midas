import React, {useState, useContext} from "react";
import {useHistory } from "react-router-dom";
import MidasApi from "../../api";
import CountContext from "../../countContext";
import Alert from "../common/Alert";

function Register(){
    // History variable
    const history = useHistory();
    const {setToken} = useContext(CountContext);

    // State variables
    const initialState = {first_name:"", last_name:"", username: "", password: "", email:""};
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    // Change event handler
    const handleChange = evt => {
        const {name, value } = evt.target;
        setFormData(fData => ({...fData, [name]: value }));
    };
    
    async function doRegister(registerData){
        try {
            let token = await MidasApi.register(registerData);
            return {success: true, token };
        } catch (errors) {
            console.error("registration failed", errors);
            return {success: false, errors };
        }
    }

    // Submit event handler
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        
        const result = await doRegister(formData);

        if (result.success){
            setFormData(initialState);
            setToken(result.token);
            history.push(`/users/${formData.username}`);
        } else {
            setFormErrors(result.errors);
        }
    };

    // Actual form
    return (
        <div>
            {formErrors.length ? <Alert type="danger" messages={formErrors}/> : null}
            <h3>Register below:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" value={formData.username}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={formData.password}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input id="firstName" name="first_name" value={formData.first_name}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="astName" id="lastName" name="last_name" value={formData.last_name}onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" name="email" value={formData.email}onChange={handleChange}/>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
