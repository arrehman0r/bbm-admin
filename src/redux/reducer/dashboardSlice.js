import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        option: "Add Agency"
    },
    reducers: {
        setDashboardOption: (state, action) => {
            return { ...state, option: action.payload };
        },
    },
});

export const { setDashboardOption } = dashboardSlice.actions;
export default dashboardSlice.reducer;