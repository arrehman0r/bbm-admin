import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import dashboardReducer from "./dashboardSlice";  

const rootReducer = combineReducers({
    loading: loaderReducer,
    user: userReducer,
    dashboard: dashboardReducer 
});

export default rootReducer;