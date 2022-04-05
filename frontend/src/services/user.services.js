import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "../services/auth.service";
import { useState } from "react";
import { ModalActions } from "semantic-ui-react";

const API_URL = "https://time-flocker-2022.herokuapp.com/";

const currentUser = AuthService.getCurrentUser(); // remember to handle when there is no user logged-in

//gets all timesheets of an user
const getTimehsheets = () => {
  return axios.get(API_URL + "/timesheet/" + `${currentUser.user_data[0].employee_id}`, { headers: authHeader() });
};


const createTimesheet = (employee_id, start_time, end_time, work_desc) => {
  return axios.post(API_URL + "User/usersAva", {
    employee_id,
    start_time,
    end_time,
    work_desc
  });
}

// const deleteInvitee = (invited_id, meeting_id, user_id) => {
//   const invite_id_list = [];
//   invite_id_list.push(invited_id);
//   const obj = {
//     invite_id_list,
//     meeting_id, 
//     user_id
//   }
//   return axios.delete(API_URL + "Invites/invites/", {data:obj})
// }

/* End For Schedule display */

/* For Update User */
// const putUserInfo = (password, user_id, user_name, login_email) => {
//   return axios.put(API_URL + "User/users/2",
//   {
//     password,
//     user_id,
//     user_name,
//     login_email
//   });
// }

export default {
  getTimehsheets,
  createTimesheet,
};