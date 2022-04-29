import React, { Component, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import Chart from 'chart.js/auto'
import { Pie } from "react-chartjs-2";

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
import AuthService from "../services/auth.service";

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

  const currentUser = AuthService.getCurrentUser();
  
  const [data, setdata] = useState({
    "username": currentUser.user_data[0].username,
    "employee_id": currentUser.user_data[0].employee_id,
  //   "password": ""
  });

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
              <Menu.Item active as="a">Dashboard</Menu.Item>
              <Menu.Item as="a">Settings</Menu.Item>
              <Menu.Item as={Link} to="/Profile">Profile</Menu.Item>
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
              <Menu.Item active as={Link} to="/Dashboard">Dashboard</Menu.Item>
              <Menu.Item as="a">Settings</Menu.Item>
              <Menu.Item as={Link} to="/Profile">Profile</Menu.Item>
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
            <Header size="huge" textAlign="center">{data.username}</Header>
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
                {/* Pie Chart #1 */}
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Pie
                    data={{ labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [ {
                        label: '# of votes',
                        data: [12, 23, 8, 19, 60, 1],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                            }}
                    width={2000}
                    height={2000}
                    options={{mainAspectRatio: false}}/>
                </Grid.Column>
                {/* Pie chart #2 */}
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Pie
                    data={{ labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [ {
                        label: '# of votes',
                        data: [2, 50, 28, 5, 10, 1],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                            }}
                    width={2000}
                    height={2000}
                    options={{mainAspectRatio: false}}/>
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
