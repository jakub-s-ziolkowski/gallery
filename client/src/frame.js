
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Gallery from './components/Gallery/Gallery';
import Form from './components/Form/Form';

export default function Frame () {

    const [ isAuthorized, makeAuthorized ] = useState('');

    const [ token, setToken ] = useState();

    useEffect(() => {

        fetch('/users/auth', { headers: { Authorization: `Bearer: ${token}` } })
            .then(res => res.json())
            .then(data => {

                if (data.user && data.user.user)
                    makeAuthorized(data.user.user.username);

                else makeAuthorized('');
            })
                .catch(error => {});
    }, [token]);

    return (
        <Router>
            <Header isAuthorized = { isAuthorized } setToken = { setToken }/>
            <Routes>
                <Route exact path = '/' element = { <Gallery isAuthorized = { isAuthorized } showConfig = { false }/> }/>
                <Route path = '/gallery' element = { <Gallery isAuthorized = { isAuthorized } showConfig = { true }/> }/>
                <Route path = '/sign-in' element = { <Form isAuthorized = { isAuthorized } isExtended = { false } setToken = { setToken }/> }/>
                <Route path = '/sign-up' element = { <Form isAuthorized = { isAuthorized } isExtended = { true }/> }/>
            </Routes>
        </Router>
    )
};
