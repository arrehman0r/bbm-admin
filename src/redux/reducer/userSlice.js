import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: {},
    userToken: null
   },
  reducers: {
    setLoginUser: (state, action) => {
        return { ...state, loginUser: action.payload };
      },
      setUserToken: (state, action) => {
        return { ...state, userToken: action.payload };
      },
  },
});

export const { setLoginUser, setUserToken } = userSlice.actions;
export default userSlice.reducer;