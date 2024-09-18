import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripType: "One Way",
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
  currencyPreference: "PKR",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTripType: (state, action) => {
      state.tripType = action.payload;
    },
    setAdultsCount: (state, action) => {
      state.adultsCount = action.payload;
    },
    setChildrenCount: (state, action) => {
      state.childrenCount = action.payload;
    },
    setInfantCount: (state, action) => {
      state.infantsCount = action.payload;
    },
    setFlightTickets: (state, action) => {
      state.flightTickets = action.payload;
    },
    setDepartureCity: (state, action) => {
      state.departureCity = action.payload;
    },
    setArrivalCity: (state, action) => {
      state.arrivalCity = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setFlightStops: (state, action) => {
      state.flightStops = action.payload;
    },
    setFlightPriceRange: (state, action) => {
      state.flightPriceRange = action.payload;
    },
    setTicketCount: (state, action) => {
      state.ticketCount = action.payload;
    },
    setTicketClass: (state, action) => {
      state.ticketClass = action.payload;
    },
    setAirlinePreference: (state, action) => {
      state.airLinePreference = action.payload;
    },
    setCurrencyPreference: (state, action) => {
      state.currencyPreference = action.payload;
    },
    resetFilters: (state) => {
      state.flightStops = false;
      state.flightPriceRange = null;
      state.ticketCount = null;
      state.ticketClass = null;
      state.airLinePreference = null;
      state.currencyPreference = { label: "Pakistani Rupee", code: "PKR" };
    },
    resetFiltersState: () => initialState,
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
  setTripType,
  resetFiltersState
} = ticketSlice.actions;

export default ticketSlice.reducer;