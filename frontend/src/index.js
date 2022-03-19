import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import App from "./App";


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App/>} />
            //write other paths below
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);