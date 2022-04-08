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
  Table
} from "semantic-ui-react";

import AuthService from "../services/auth.service";

const PayStubs = (props) => {

const MenuList = () => {
  return <Menu vertical borderless fluid text>
  <Menu.Item as="a">
    Overview
  </Menu.Item>
  <Menu.Item as="a">Timesheet</Menu.Item>
  <Menu.Item active as="a">Pay Stubs</Menu.Item>
  <Menu.Item as="a">Requests</Menu.Item>
  <Menu.Item as="a">Work Trends</Menu.Item>
</Menu>
}

return (
<div className="App">
<Grid padded className="tablet computer only">
  <Menu borderless inverted fluid fixed="top">
    <Menu.Item header as="a">
      Timeflocker
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <Input placeholder="Search..." size="small" />
      </Menu.Item>
      <Menu.Item as="a">Dashboard</Menu.Item>
      <Menu.Item as="a">Settings</Menu.Item>
      <Menu.Item as="a">Profile</Menu.Item>
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
      <Menu.Item as="a">Dashboard</Menu.Item>
      <Menu.Item as="a">Settings</Menu.Item>
      <Menu.Item as="a">Profile</Menu.Item>
      <Menu.Item as="a">Help</Menu.Item>
      <Menu.Item as="a">Login/Signup</Menu.Item>
      <Divider fitted />
      <Menu.Item>
        <Input placeholder="Search..." size="small" />
      </Menu.Item>
    </Menu>
  </Menu>
</Grid>
<Grid padded>
  <Grid.Column
    tablet={3}
    computer={3}
    only="tablet computer"
    id="sidebar"
  >
    <Image circular size='big' src="/static/images/wireframe/square-image.png"/>
    <Divider section/>
    {MenuList()/** modify MenuList according to component */} 
  </Grid.Column>
  </Grid>
  </div>
    )
  };

export default PayStubs;