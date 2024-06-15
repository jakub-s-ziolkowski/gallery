
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import './Form.scss';

export default function Form ({ isAuthorized, isExtended, setToken }) {

    const navigate = useNavigate();

    useEffect(() => { if (isAuthorized) navigate('/'); });

    const [ usernameErrorMessage, setUsernameErrorMessage ] = useState();
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState();
    const [ repeatNewPasswordErrorMessage, setRepeatNewPasswordErrorMessage ] = useState();

    const [ authErrorMessage, setAuthErrorMessage ] = useState();

    const errorMessage = {

        'username': {
            value: usernameErrorMessage,
            set: setUsernameErrorMessage,
        },
        'current-password': {
            value: passwordErrorMessage,
            set: setPasswordErrorMessage,
        },
        'repeat-new-password': {
            value: repeatNewPasswordErrorMessage,
            set: setRepeatNewPasswordErrorMessage,
        },
        'auth': {
            value: authErrorMessage,
            set: setAuthErrorMessage,
        },
    }

    const inputName = isExtended ? 'new-password' : 'current-password';

    errorMessage['new-password'] = errorMessage['current-password'];

    const [ formData, setFormData ] = useState({

        'username': '',
        'current-password': '',
        'new-password': '',
        'repeat-new-password': '',
    });

    const location = useLocation();

    const inputs = {

        'username': useRef(null),
        'password': useRef(null),
        'repeat-password': useRef(null),
    }

    useEffect(() => {

        setFormData({

            'username': '',
            'current-password': '',
            'new-password': '',
            'repeat-new-password': '',
        });

        inputs['username'].current.value = '';
        inputs['password'].current.value = '';

        if (inputs['repeat-password'].current)
            inputs['repeat-password'].current.value = '';

    }, [location]);

    let error = false;

    const setMessage = (name, message) => {

        error = true;
        errorMessage[name].set(message)
        setTimeout(() => errorMessage[name].set(''), 1500);
    };

    const handleChange = event => {

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async event => {

        event.preventDefault();
        error = false;

        if (!formData['username'].length)
            setMessage('username', 'Enter username');

        else if (formData['username'].length < 3)
            setMessage('username', 'Too short');

        if (!formData[inputName].length)
            setMessage('new-password', 'Enter password');

        if (isExtended) {

            if (formData['new-password'].length < 3)
                setMessage('new-password', 'Too short');

            if (!formData['repeat-new-password'].length)
                setMessage('repeat-new-password', 'Repeat password');

            else if (formData['new-password'] !== formData['repeat-new-password'])
                setMessage('repeat-new-password', 'Passwords doesn\'t match');
        }

        if (!error)
            fetch(`/users/${isExtended ? 'sign-up' : 'sign-in'}`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)})
                .then(res => res.json())
                .then((message) => {

                    if (typeof message === 'object') {

                        if (isExtended) navigate('/sign-in');

                        else {

                            setToken(message.token);
                            navigate('/gallery');
                        }
                    }

                    else {

                        setAuthErrorMessage(message);
                        setTimeout(() => setAuthErrorMessage(''), 1500);
                    }
                })
                    .catch(error => {});
    };

    return (

        <form
            className = "signForm"
            spellCheck = "false"
            autoComplete = {isExtended ? "off" : "on"}
            onSubmit = { handleSubmit }
            >
                <div className = {"signForm__box" + (isExtended ? " signForm__box--extended" : "")}>
                    <div className = "signForm__frame">
                        <input className = "signForm__input" name = "username" id = "username" ref = { inputs['username'] }
                            type = "text" placeholder = "Username" onChange = { handleChange }/>
                        <span className = {"signForm__error" + (errorMessage['username'].value ? " signForm__error--visible" : "")}>
                            { errorMessage['username'].value }
                        </span>
                    </div>

                    <div className = "signForm__frame">
                        <input className = "signForm__input" name = { inputName } id = "password" ref = { inputs['password'] }
                            type = "password" placeholder = {isExtended ? "New password" : "Password"} onChange = { handleChange }/>
                        <span className = {"signForm__error" + (errorMessage[inputName].value ? " signForm__error--visible" : "")}>
                            { errorMessage[inputName].value }
                        </span>
                    </div>

                    {isExtended &&
                    <div className = "signForm__frame">
                        <input className = "signForm__input" name = "repeat-new-password" id = "repeatPassword" ref = { inputs['repeat-password'] }
                            type = "password" placeholder = "Repeat password" onChange = { handleChange }/>
                        <span className = {"signForm__error" + (errorMessage['repeat-new-password'].value ? " signForm__error--visible" : "")}>
                            { errorMessage['repeat-new-password'].value }
                        </span>
                    </div>}
                </div>

            <button type = "submit" className = "signForm__button">Sign {isExtended ? "up" : "in"}</button>
            <span className = {"signForm__error" + (errorMessage['auth'].value ? " signForm__error--visible" : "")}>
                { errorMessage['auth'].value }
            </span>
            {isExtended ?
            <Link className = "signForm__trigger" title = "Log in" to = "/sign-in">Already registered?</Link>
            :
            <Link className = "signForm__trigger" title = "Create an account" to = "/sign-up">Not registered?</Link>}
        </form>
    );
};
