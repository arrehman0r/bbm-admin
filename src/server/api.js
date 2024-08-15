import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "agency", body);
};


export const getAllCoutriesName = () => {
  return makeRequest("get", "https://restcountries.com/v3.1/all");
};


