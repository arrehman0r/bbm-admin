import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "agency", body);
};

export const getTravelAgency = (pageNumber) => {
  return makeRequest("get", `agency?page=${pageNumber}`);
};

export const searchTravelAgency = ({ emailId, CNIC, agencyName }) => {
  const queryParams = new URLSearchParams();

  if (emailId) queryParams.append('agencyEmail', emailId);
  if (CNIC) queryParams.append('CNIC', CNIC);
  if (agencyName) queryParams.append('agencyName', agencyName);

  return makeRequest("get", `agency?${queryParams.toString()}`);
};


export const searchAgencySatffAdmin = ({ email, CNIC, firstName }) => {
  const queryParams = new URLSearchParams();

  if (email) queryParams.append('email', email);
  if (CNIC) queryParams.append('CNIC', CNIC);
  if (firstName) queryParams.append('firstName', firstName);
  return makeRequest("get", `staff/getAllAdmin?${queryParams.toString()}`);
};

export const searchAgencySatff = ({ email, CNIC, firstName }, id) => {
  const queryParams = new URLSearchParams();
  if (email) queryParams.append('email', email);
  if (CNIC) queryParams.append('CNIC', CNIC);
  if (firstName) queryParams.append('firstName', firstName);

  return makeRequest("get", `staff/getAll/${id}?${queryParams.toString()}`);
};



export const getAgencyUsers = (id, pageNumber) => {
  return makeRequest("get", `staff/getAll/${id}?page=${pageNumber}`);
};
export const getAgencyAllUsers = (pageNumber) => {
  return makeRequest("get", `staff/getAllAdmin?page=${pageNumber}`);
};

export const addAgencyUser = (body) => {
  return makeRequest("post", "staff/create", body);
};

export const deleteAgencyUser = (id) => {
  return makeRequest("delete", `users/${id}`);
};

export const getAgencyUserRoles = () => {
  return makeRequest("get", `roles/roleAgency`);
};


export const updateAgencyUserStatus = (id, body) => {
  return makeRequest("put", `staff/status/${id}`, body)
}

export const userLogin = (body) => {
  return makeRequest("post", "auth/login", body)
};

export const userRegister = (body) => {
  return makeRequest("post", "auth/register", body)
}

export const getFlightBooking = (body) => {
  return makeRequest("post", "agency", body);
};

export const get = (body) => {
  return makeRequest("post", "agency", body);
};

export const getAnalyticsData = () => {
  return makeRequest("get", "agency/EmployeeData");
};
