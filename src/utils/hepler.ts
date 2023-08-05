import jwt_decode from "jwt-decode";

export const getTokenDecodeValue = () => {
 const userobj = JSON.parse(localStorage.getItem("userDetails"));
 return userobj ? jwt_decode(userobj.token) : 0;
};