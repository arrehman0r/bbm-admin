import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "agency", body);
};

export const getTravelAgency = () => {
  return makeRequest("get", "agency");
};

export const getUsers = () => {
  return makeRequest("get", "users");
};

export const userLogin = (body)=>{
  return makeRequest("post" , "auth/login", body)
};

export const userRegister = (body)=>{
  return makeRequest("post" , "auth/register", body)
}

export const getFlightBooking = (body) => {
  return makeRequest("post", "agency", body);
};

export const get = (body) => {
  return makeRequest("post", "agency", body);
};
