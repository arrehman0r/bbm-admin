import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "agency", body);
};

export const getTravelAgency = () => {
  return makeRequest("get", "agency");
};

export const userLogin = (body)=>{
  return makeRequest("post" , "auth/login", body)
};

export const userRegister = (body)=>{
  return makeRequest("post" , "auth/register", body)
}
