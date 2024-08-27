import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "agency", body);
};

export const getTravelAgency = () => {
  return makeRequest("get", "agency");
};

export const getAgencyUsers = () => {
  return makeRequest("get", "users");
};

export const addAgencyUser = (body) => {
  return makeRequest("post", "users", body);
};

export const deleteAgencyUser = (id) => {
  return makeRequest("delete", `users/${id}`);
};

export const getAgencyUserRoles = (id) => {
  return makeRequest("get", `roles/daily/66bf3676d528f7523c8ecf78`);
};

export const updateAgencyUserStatus = (id, body)=>{
  return makeRequest("patch", `users/status?id=${id}`, body)
}

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
