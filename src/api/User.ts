import axios from "axios";
const url = 'http://localhost:5000';

export const signUpApi = (data = {}):Promise<any> => {
 return axios.post(`${url}/user`, data, {
   headers: {
     "Content-Type": "application/json",
     Authorization: null
   }
 })
 .then(response => response.data);
}

export const signInApi = (data = {}):Promise<any> => {
 return axios.post(`${url}/auth/login`, data, {
   headers: {
     "Content-Type": "application/json",
     Authorization: null
   }
 })
 .then(response => response.data);
}

export const updateUser = (data = {}, id):Promise<any> => {
 return axios.patch(`${url}/user/${id}`, data, {
   headers: {
     "Content-Type": "application/json"
   }
 })
 .then(response => response.data);
}

export const getUser = (id):Promise<any> => {
 return axios.get(`${url}/user/${id}`).then(response => response.data);
}