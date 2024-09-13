import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tripType:  { label: 'One Way', value: 'One Way' },
    adultsCount: 1,
    childrenCount: 0,
    infantsCount: 0,
    flightTickets: [],
    departureCity: null,
    arrivalCity: null,
    departureDate: null,
    returnDate: null,
    flightStops: false,
    flightPriceRange: null,
    ticketCount: null,
    ticketClass: null,
    airLinePreference: null,
    currencyPreference: null,
  },
  reducers: {
    setTripType: (state, action) => {
      return { ...state, tripType: action.payload };
    },

    setAdultsCount: (state, action) => {
      return { ...state, adultsCount: action.payload };
    },
    setChildrenCount: (state, action) => {
      return { ...state, childrenCount: action.payload };
    },
    setInfantCount: (state, action) => {
      return { ...state, infantsCount: action.payload };
    },
    setFlightTickets: (state, action) => {
      return { ...state, flightTickets: action.payload };
    },
    setDepartureCity: (state, action) => {
      return { ...state, departureCity: action.payload };
    },
    setArrivalCity: (state, action) => {
      return { ...state, arrivalCity: action.payload };
    },
    setReturnDate: (state, action) => {
      return { ...state, returnDate: action.payload };
    },
    setDepartureDate: (state, action) => {
      return { ...state, departureDate: action.payload };
    },
    setFlightStops: (state, action) => {
      return { ...state, flightStops: action.payload };
    },
    setFlightPriceRange: (state, action) => {
      return { ...state, flightPriceRange: action.payload };
    },
    setTicketCount: (state, action) => {
      return { ...state, ticketCount: action.payload };
    },
    setTicketClass: (state, action) => {
      return { ...state, ticketClass: action.payload };
    },
    setAirlinePreference: (state, action) => {
      return { ...state, airLinePreference: action.payload };
    },
    setCurrencyPreference: (state, action) => {
      return { ...state, currencyPreference: action.payload };
    },

    resetFilters: (state) => {
      return {
        ...state,
        flightStops: false,
        flightPriceRange: null,
        ticketCount: null,
        ticketClass: null,
        airLinePreference: null,
        currencyPreference: null,
      };
    },
  },
});

export const {
  setAdultsCount,
  setChildrenCount,
  setInfantCount,
  setFlightTickets,
  setDepartureCity,
  setArrivalCity,
  setReturnDate,
  setDepartureDate,
  setFlightStops,
  setFlightPriceRange,
  setTicketCount,
  setTicketClass,
  setAirlinePreference,
  setCurrencyPreference,
  resetFilters, 
  setTripType
} = ticketSlice.actions;

export default ticketSlice.reducer;
