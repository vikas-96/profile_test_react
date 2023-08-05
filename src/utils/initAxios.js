import axios from "axios";
const url = 'http://localhost:5000';

export default function (t) {
  const userobj = JSON.parse(localStorage.getItem("userDetails"));
  const token = userobj ? userobj.token : "";

  axios.defaults.baseURL = url;
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  const errorHandler = (error) => {
    if (error.response && 401 === error.response.status) {
      localStorage.removeItem("userDetails");
      return error.response.data.message === "Login failed"
        ? Promise.reject(error)
        : (window.location = "/");
    } else {
      return Promise.reject(error);
    }
  };

  axios.interceptors.response.use((response) => response, errorHandler);
}
