import React, { Component, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

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
import userServices from "../services/user.services";

import "./Dashboard.css";

const Dashboard = (props) => {
  // state = {
  //   dropdownMenuStyle: {
  //     display: "none"
  //   }
  // };

  // handleToggleDropdownMenu = () => {
  //   let newState = Object.assign({}, this.state);
  //   if (newState.dropdownMenuStyle.display === "none") {
  //     newState.dropdownMenuStyle = { display: "flex" };
  //   } else {
  //     newState.dropdownMenuStyle = { display: "none" };
  //   }

  //   this.setState(newState);
  // };

  const [tableData, setTableData] = useState([{}]);

  const getTableData = () => {
    userServices.getTimehsheets().then(
    (response) => {
      setTableData(response.data);

    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getTableData();
  }, []);

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
            <Menu vertical borderless fluid text>
              <Menu.Item active as="a">
                Overview
              </Menu.Item>
              <Menu.Item as="a">Timesheet</Menu.Item>
              <Menu.Item as="a">Pay Stubs</Menu.Item>
              <Menu.Item as="a">Requests</Menu.Item>
              <Menu.Item as="a">Work Trends</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={13}
            computer={13}
            floated="right"
            id="content"
          >
            <Grid padded>
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Dashboard
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
              </Grid.Row>
              <Divider section hidden />
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  My Timesheet
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Table singleLine striped selectable unstackable
                tableData={['some', 'random', 'array']}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Work Description</Table.HeaderCell>
                      <Table.HeaderCell>Start Time</Table.HeaderCell>
                      <Table.HeaderCell>End Time</Table.HeaderCell>
                      <Table.HeaderCell>Hours Worked</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
            {Object.values(tableData).map(
              ({ work_desc, start_time, end_time}) => {
                let start_formatted = new Date(start_time);
                let end_formatted = new Date(end_time);
                let hours_worked = (Math.abs(end_formatted
                - start_formatted) / 36e5).toFixed(2); 
                return (
                  <Table.Row>
                    <Table.Cell>{work_desc}</Table.Cell>
                    <Table.Cell>{start_time}</Table.Cell>
                    <Table.Cell>{end_time}</Table.Cell>
                    <Table.Cell>{hours_worked} hour(s)</Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

export default Dashboard;
