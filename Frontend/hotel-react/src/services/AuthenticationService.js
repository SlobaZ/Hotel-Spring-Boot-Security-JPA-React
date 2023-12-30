import axios from "axios";

const API_URL = "http://localhost:8080/authorized/"; 


 const login = (username, password) => {
    return axios.post(API_URL + "signin", { username, password })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  };

 const logout = () => {
    localStorage.removeItem("user");
  };

  const register = (username, password, city, jmbg, phone) => {
    return axios.post(API_URL + "signup", {  username, password, city, jmbg, phone });
  };

 const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  const AuthenticationService = {
    login,
    register,
    logout,
    getCurrentUser,
  };

export default AuthenticationService;
