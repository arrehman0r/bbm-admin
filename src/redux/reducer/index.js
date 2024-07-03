import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";



const rootReducer = combineReducers({

    loading: loaderReducer,
    user: userReducer
});

export default rootReducer;