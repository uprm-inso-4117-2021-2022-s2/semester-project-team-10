import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Label,
  Menu,
  Table, 
  Card,
  CardContent,
  Container
} from "semantic-ui-react";

import AuthService from "../services/auth.service";

const Profile = (props) => {

    const currentUser = AuthService.getCurrentUser();
  
    const [data, setdata] = useState({
      "username": currentUser?.user_data[0].username,
      "employee_id": currentUser?.user_data[0].employee_id, //might not want to store employee_id as it is sensitive data
    //   "password": ""
    });


return (
    <div className="App">
    <Grid padded className="tablet computer only">
        <Menu borderless inverted fluid fixed="top" color="red">
            <Menu.Item header as={Link} to='/'>
              <Image size='mini' src='/Time-Flocker-logo.png' style={{ marginRight: '1.5em' }}/>
              Timeflocker
            </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
            <Input placeholder="Search..." size="small" />
            </Menu.Item>
            <Menu.Item as={Link} to="/Dashboard">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item active as="a">Profile</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
            <Menu.Item as="a">Login/Signup</Menu.Item>
        </Menu.Menu>
        </Menu>
    </Grid>
    <Grid padded className="mobile only">
        <Menu borderless inverted fluid fixed="top">
        <Menu.Item header as="a">
            Timeflocker
        </Menu.Item>
        {/* <Menu.Menu position="left">
            <Menu.Item>
            <Button
                basic
                inverted
                icon
                size="big"
                toggle
                //onClick={this.handleToggleDropdownMenu}
            >
                <Icon name="content" />
            </Button>
            </Menu.Item>
        </Menu.Menu> */}
        <Menu
            borderless
            fluid
            inverted
            vertical
            //style={this.state.dropdownMenuStyle}
        >
            <Menu.Item as={Link} to="/Dashboard">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item active as="a">Profile</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
            <Menu.Item as="a">Login/Signup</Menu.Item>
            <Divider fitted />
            <Menu.Item>
            <Input placeholder="Search..." size="small" />
            </Menu.Item>
        </Menu>
        </Menu>
    </Grid>
    <Grid padded centered>
        <Grid.Column
        tablet={4}
        computer={4}
        only="tablet computer"
        id="sidebar"
        >
        <Header textAlign='center' size='huge'>My Profile</Header> 
        <Icon style={{"margin-left":'30%'}} size='massive' name="user circle"/>
        <Header textAlign='center'>Hello, {currentUser?.user_data &&
                currentUser?.user_data.map((uData) => uData.username)}!
        </Header>

        <Divider section/>
            <Menu vertical borderless fluid text>
                <Menu.Item as="a">
                    <p>
                        <Header>Email: 
                        <h3>
                            <Label basic>
                            {currentUser?.user_data.map(uData => <div>{uData.user_email}</div> )}
                            </Label>
                        </h3>
                        </Header> 
                    </p>
                </Menu.Item>
                <Menu.Item as="a">
                    <p>  
                        <Header>Role:
                        <h3>
                            <Label basic>{currentUser?.user_data &&
                                currentUser?.user_data.map((uData) => uData.role)}
                            </Label>  
                        </h3>
                        </Header>
                    </p>
                </Menu.Item>
                <Menu.Item as="a"> 
                    <p>  
                        <Header>Wage:
                        <h3>
                            <Label basic>${currentUser?.user_data &&
                                currentUser?.user_data.map((uData) => uData.wage)}/h
                            </Label>  
                        </h3>
                        </Header>
                    </p>
                </Menu.Item>
            </Menu>
        </Grid.Column>
        </Grid>
        </div>
    )
};

export default Profile;