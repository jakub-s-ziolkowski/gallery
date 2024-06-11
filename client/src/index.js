
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Gallery from './components/Gallery/Gallery';
import Form from './components/Form/Form';

import './index.scss';

ReactDOM.createRoot(document.querySelector('main')).render(

    <React.StrictMode>
        <Router>
            <Header/>
            <Routes>
                <Route exact path = '/' element = { <Gallery showConfig = {false}/> }/>
                <Route path = '/gallery' element = { <Gallery showConfig = {true}/> }/>
                <Route path = '/sign-in' element = { <Form isExtended = {false}/> }/>
                <Route path = '/sign-up' element = { <Form isExtended = {true}/> }/>
                <Route path = '/sign-out' element = { <Gallery showConfig = {false}/> }/>
            </Routes>
        </Router>
    </React.StrictMode>
);
