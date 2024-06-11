
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Form.scss';

export default function Form ({ isExtended }) {

    const [formData, setFormData] = useState();

    const handleChange = event => {

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async event => {

        event.preventDefault();

        if (isExtended && formData['new-password'] !== formData['repeat-new-password'])
            return

        fetch(`/users/${isExtended ? 'sign-up' : 'sign-in'}`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)})
            .then(res => { if (res.ok) console.log(res); });
    };

    return (

        <form
            className = "signForm"
            spellCheck = "false"
            autoComplete = {isExtended ? "off" : "on"}
            onSubmit = {handleSubmit}
            >
                <div className = "signForm__frame">
                    <input className = "signForm__input" name = "username" id = "username"
                        type = "text" placeholder = "Username" onChange = {handleChange} required minLength = "3"/>

                    <input className = "signForm__input" name = {isExtended ? "new-password" : "current-password"} id = "password"
                        type = "password" placeholder = {isExtended ? "New password" : "Password"} onChange = {handleChange} required minLength = "3"/>

                    {isExtended &&
                    <input className = "signForm__input" name = "repeat-new-password" id = "repeatPassword"
                    type = "password" placeholder = "Repeat password" onChange = {handleChange} required minLength = "3"/>}
                </div>

            <button type = "submit" className = "signForm__button">Sign {isExtended ? "up" : "in"}</button>
            {isExtended ?
            <Link className = "signForm__trigger" title = "Log in" to = "/sign-in">Already registered?</Link>
            :
            <Link className = "signForm__trigger" title = "Create an account" to = "/sign-up">Not registered?</Link>}
        </form>
    );
};
