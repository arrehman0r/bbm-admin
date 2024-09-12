import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        adultsCount: 0,
        childrenCount: 0,
        infantsCount: 0,
        flightTickets: [],
        departureCity: null,
        arrivalCity: null,
        departureDate: null,
        returnDate: null
    },
    reducers: {
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
    },
});

export const { setAdultsCount, setChildrenCount, setInfantCount, setFlightTickets, setDepartureCity , setArrivalCity, setReturnDate, setDepartureDate } = ticketSlice.actions;
export default ticketSlice.reducer;