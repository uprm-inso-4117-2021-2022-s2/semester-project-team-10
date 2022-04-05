import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import App from "./App";
import Dashboard from './components/Dashboard';
import LoginForm from './components/Login';


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route exact path='/Login' element={<LoginForm/>} />
            //write other paths below
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);