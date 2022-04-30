import React, { useState, useRef } from 'react'
import { withRouter, Link, Navigate } from 'react-router-dom'
import { Icon, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import EmailValidator, { validate } from 'email-validator';
import passwordValidator from 'password-validator';

import AuthService from "../services/auth.service";
import Dashboard from './Dashboard';


const LoginForm = (props) => {

const [email, setEmail] = useState("");
const [validEmail, validateEmail] = useState(true);
const [password, setPassword] = useState("");
const [validPassword, validatePassword] = useState(true);

const [message, setMessage] = useState("");
const [successful, setSuccessful] = useState(false);

const [errMsg, setErrMsg] = useState(false);

const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    validateEmail(EmailValidator.validate(email));
};

//To validate password
var schema = new passwordValidator();
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validatePassword(schema.validate(password))
};

const handleLogin = (e) => {
    e.preventDefault();

    setMessage(""); //error message that can be displayed
    setSuccessful(false);

    AuthService.login(email, password).then(
        (response) => {
            setMessage("Login Successful!");
            console.log(response.status);
            setErrMsg(false)
            setSuccessful(true);
            
          }).catch((error) => {
            setSuccessful(false);
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              //setMessage(resMessage);
              console.log(successful);
            error.response.status == 401? (setMessage("Unauthorized Access!"))
                : (setMessage("Fatal Error!")) ;
            //setMessage(resMessage);
            
            setErrMsg(true);
          }
        );
    };


return (
<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='black' textAlign='center'>
        <Image src='\Time-Flocker-logo.png'
        as={Link}
        to="/"/> Log-in to your account
    </Header>
    <Form size='large'
        onSubmit={handleLogin}>
        <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
            value={email}
            onChange={onChangeEmail}
            error={validEmail ? false: {
                content: 'Please enter a valid email address.',
                pointing: 'below'
            }}/>
        <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={password}
            onChange={onChangePassword}
            error={validPassword ? false: {
                content: 'Please enter a valid password.',
                pointing: 'below'
            }}
        />

        <Button type='submit' color='black' fluid size='large'>
            Login
        </Button>
        <Message negative hidden={successful}>
            <Message.Content>{message}</Message.Content>
        </Message>
        </Segment>
    </Form>
    <Message>
        New to us? <Link to='/SignUp'>Sign Up</Link>
    </Message>
    </Grid.Column>
</Grid>
    );
}

export default LoginForm;
