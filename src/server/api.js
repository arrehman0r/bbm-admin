import { makeRequest } from "./instance";


export const addTravelAgency = (body) => {
  return makeRequest("post", "business", body);
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

export const searchCityCode = (keyword) => {
  return makeRequest("get", `flights/cityData?city=${keyword}`);
};

export const getAgencyUsers = (id, pageNumber) => {
  return makeRequest("get", `staff/getStaffByBusiness/${id}?page=${pageNumber}`);
};
export const getAgencyAllUsers = (pageNumber) => {
  return makeRequest("get", `staff/getAllAdmin?page=${pageNumber}`);
};

export const addAgencyUser = (body) => {
  return makeRequest("post", "staff", body);
};

export const addBusinessServices = (body) => {
  return makeRequest("post", "services", body);
};
export const deleteAgencyUser = (id) => {
  return makeRequest("delete", `users/${id}`);
};

export const getAgencyUserRoles = () => {
  return makeRequest("get", `roles/roleAgency`);
};

export const getAllServices = (id, page) => {
  let url = `services/business/${id}`;
  if (page) {
    url += `?page=${page}`;
  }
  return makeRequest("get", url);
};

export const getAgencyTypes = () => {
  return makeRequest("get", `type/getAll`);
};

export const updateAgencyUserStatus = (id, body) => {
  return makeRequest("put", `staff/status/${id}`, body)
}

export const userLogin = (body) => {
  return makeRequest("post", "auth/login", body)
};

export const userRegister = (body) => {
  return makeRequest("post", "auth/adminRegister", body)
}

export const getFlightBooking = (body) => {
  return makeRequest("post", "agency", body);
};

export const getAnalyticsData = () => {
  return makeRequest("get", "agency/EmployeeData");
};

export const getFlightsData = ({
  startDate,
  endDate,
  arrival,
  departure,
  adultsCount,
  childrenCount,
  infantsCount,
  currencyPreference,
  airLinePreference,
  excludedAirlines,
  ticketClass,
  ticketCount,
  flightPriceRange,
  flightStops
}) => {
  // Base URL with mandatory parameters
  let url = `flights/flightData?start_date=${startDate}&arrival=LHE&dept=LON`;

  // Conditionally append optional parameters if they exist
  if (endDate) {
    url += `&end_date=${endDate}`;
  }
  if (adultsCount) {
    url += `&adult=${adultsCount}`;
  }
  if (childrenCount) {
    url += `&children=${childrenCount}`;
  }
  if (infantsCount) {
    url += `&infants=${infantsCount}`;
  }
  if (currencyPreference) {
    url += `&currencyCode=${currencyPreference}`;
  }
  if (ticketClass) {
    url += `&travelClass=${ticketClass}`;
  }
  if (flightStops !== undefined) {
    url += `&nonStop=${flightStops}`;
  }
  if (flightPriceRange) {
    url += `&maxPrice=${flightPriceRange}`;
  }
  if (ticketCount) {
    url += `&max=${ticketCount}`;
  }
  if (airLinePreference) {
    url += `&includedAirlineCodes=${airLinePreference}`;
  }
  if (excludedAirlines) {
    url += `&excludedAirlineCodes=${excludedAirlines}`;
  }
  console.log("url is .......", startDate,
    endDate,
    arrival,
    departure,
    adultsCount,
    childrenCount,
    infantsCount,
    currencyPreference,
    airLinePreference,
    excludedAirlines,
    ticketClass,
    ticketCount,
    flightPriceRange,
    flightStops)
  // Make the request with the constructed URL
  return makeRequest("get", url);
};


export const submitBookingRequest = (body) => {
  return makeRequest("post", "flights/createBooking", body);
};


export const getSabreFlightsData = ({
  startDate,
  endDate,
  arrival,
  departure,
  adultsCount,
  childrenCount,
  infantsCount,
  currencyPreference,
  airLinePreference,
  excludedAirlines,
  ticketClass,
  ticketCount,
  flightPriceRange,
  flightStops
}) => {
  // Base URL with mandatory parameters
  let url = `sabre/flightData?start_date=${startDate}&arrival=LHE&dept=LON`;

  // Conditionally append optional parameters if they exist
  if (endDate) {
    url += `&end_date=${endDate}`;
  }
  if (adultsCount) {
    url += `&adult=${adultsCount}`;
  }
  if (childrenCount) {
    url += `&children=${childrenCount}`;
  }
  if (infantsCount) {
    url += `&infants=${infantsCount}`;
  }
  if (currencyPreference) {
    url += `&currencyCode=${currencyPreference}`;
  }
  if (ticketClass) {
    url += `&travelClass=${ticketClass}`;
  }
  if (flightStops !== undefined) {
    url += `&nonStop=${flightStops}`;
  }
  if (flightPriceRange) {
    url += `&maxPrice=${flightPriceRange}`;
  }
  if (ticketCount) {
    url += `&max=${ticketCount}`;
  }
  if (airLinePreference) {
    url += `&includedAirlineCodes=${airLinePreference}`;
  }
  if (excludedAirlines) {
    url += `&excludedAirlineCodes=${excludedAirlines}`;
  }
  console.log("url is .......", startDate,
    endDate,
    arrival,
    departure,
    adultsCount,
    childrenCount,
    infantsCount,
    currencyPreference,
    airLinePreference,
    excludedAirlines,
    ticketClass,
    ticketCount,
    flightPriceRange,
    flightStops)
  // Make the request with the constructed URL
  return makeRequest("get", url);
};



export const getAgencySalesData = () => {
  return makeRequest("get", "flights/agencySaleData");
};

export const getFlightSalesData = () => {
  return makeRequest("get", "flights/getFlightSalesData");
};

export const getDashboardData = () => {
  return makeRequest("get", "flights/data");
};

export const getAllBookings = () => {
  return makeRequest("get", "business/appointments");
};


export const getFlightRules = (body) => {
  return makeRequest("post", "flights/flightRules", body);
};



export const updateAgencyStaff = (id, body) => {
  return makeRequest("patch", `staff/update/${id}`, body);
};

export const addDailyDeal = (body) => {
  return makeRequest("post", `deals/daily`, body);
};

export const getDailyDeals = (id) => {
  return makeRequest("get", `deals/getDealsByBusiness/${id}`);
};



export const getAllTaxes = () => {
  return makeRequest("get", `tax/getAll`);
};

