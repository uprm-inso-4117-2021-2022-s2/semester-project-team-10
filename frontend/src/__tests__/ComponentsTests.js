import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';
import App from '../App';

describe('mock components tests', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><SignUp/></BrowserRouter>, div);
        ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
        ReactDOM.render(<BrowserRouter><Profile/></BrowserRouter>, div);
        ReactDOM.render(<BrowserRouter><Dashboard/></BrowserRouter>, div);
        ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, div);
    })
})
