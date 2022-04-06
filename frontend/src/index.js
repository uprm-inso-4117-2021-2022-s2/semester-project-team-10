import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import App from "./App";
import Dashboard from './components/Dashboard';
import LoginForm from './components/Login';
import SignUp from './components/SignUp';


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<App/>} />
            <Route exact path='/Dashboard' element={<Dashboard/>} />
            <Route exact path='/Login' element={<LoginForm/>} />
            <Route exact path='/SignUp' element={<SignUp/>} />
            //write other paths below
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);