import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Divider, Dropdown, Form, Grid, Header, Image, Message, Segment, Select } from 'semantic-ui-react'
import EmailValidator from 'email-validator'
import passwordValidator from 'password-validator';
import AuthService from "../services/auth.service";

const SignUp = () => {

const roleOptions = [{ key: 'admin', value: 'ADMIN', text: 'Administrator' },
{ key: 'regular', value: 'REGULAR', text: 'Regular Employee' }]

const [username, setUsername] = useState("");
const [usernameTaken, setUsernameTaken] = useState(false);
const [email, setEmail] = useState("");
const [validEmail, validateEmail] = useState(true);
const [password, setPassword] = useState("");
const [validPassword, validatePassword] = useState(true);
const [wage, setWage] = useState();
const [role, setRole] = useState("");

const [message, setMessage] = useState("");
const [successful, setSuccessful] = useState(false);

const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
}

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

const onChangeWage = (e) => {
    const wage = e.target.value;
    setWage(wage);
}

const onChangeRole = (e, data) => {
    const role = data.value;
    setRole(role);
}

const handleRegister = (e) => {
    e.preventDefault();

    setMessage(""); //error message that can be displayed
    setSuccessful(false);

    AuthService.register(username, email, password, role, wage).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
  };

return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='\static\images\wireframe\Time-Flocker-logo.png'
            as={Link}
            to="/"/> Register a new acount
      </Header>
      <Form size='large'
      onSubmit={handleRegister}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' //username
            value={username}
            onChange={onChangeUsername}
          />
          <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' // email
          value={email}
          onChange={onChangeEmail}
          error={validEmail ? false: {
              content: 'Please enter a valid email address.',
              pointing: 'below'
          }}/>
          <Form.Input   //password
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
        <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
          />
        <Message size='mini'color='brown'>
            <Message.Header>Password must:</Message.Header>
            <Message.List>
                <Message.Item>Have at least 8 characters.</Message.Item>
                <Message.Item>Have at least 1 uppercase letter.</Message.Item>
                <Message.Item>Have at least 2 digits.</Message.Item>
            </Message.List>
        </Message>

        <Divider/>
        <Form.Field required>
            <Form.Dropdown
                placeholder='Select your role.'
                options={roleOptions}
                selection
                value={role}
                onChange={onChangeRole}/>
        </Form.Field>
        <Form.Input
            placeholder="Wage (i.e. $12.00)"
            icon='dollar'
            iconPosition='left'
            type='number'
            step='.01'
            value={wage}
            onChange={onChangeWage}/>
        <Form.Field required>
            <Form.Checkbox align='left' label="I accept the Terms & Conditions."/>
        </Form.Field>
        {message && (
            <Form.Group>
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </Form.Group>
          )}
          <Button type='submit' color='teal' fluid size='large'>
            Sing Up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already Registered? <Link to='/Login'>Log in</Link>
      </Message>
    </Grid.Column>
  </Grid>
    );
};

export default SignUp;
