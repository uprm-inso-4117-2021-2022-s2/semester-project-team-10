import axios from "axios";

const API_URL = "https://time-flocker-2022.herokuapp.com/";

const register = (username, user_email, user_password, role, wage) => {
  return axios.post(API_URL + "employee", {
    username,
    user_email,
    user_password,
    role,
    wage
  });
};

const login = async (user_email, user_password) => {
  const response = await axios
    .post(API_URL + "login", {
      user_email,
      user_password,
    });
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLoggedIn = () => {
  return !localStorage.getItem("user"); //use a safer alternative
}
const removeAcount = (id_user,obj) => {
  return axios.delete(API_URL + "User/users/"+id_user, {data:obj});
};

const updateAcount = (id_user,obj) => {
  return axios.put(API_URL + "User/users/"+id_user, obj);
};


export default {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  removeAcount,
  updateAcount,
};
