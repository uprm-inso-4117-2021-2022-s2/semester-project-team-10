import axios from "axios";

const API_URL = "https://db-404-error-power-not-found.herokuapp.com/404-error-power-not-found/";

const register = (user_name, email, password, auth) => {
  return axios.post(API_URL + "User/users", {
    user_name,
    email,
    password,
    auth,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "User/login", {
      email,
      password,
    });
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLoggedIn = () => {
  return !localStorage.getItem("user"); //DO NOT USE localStorage, use a safer alternative
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