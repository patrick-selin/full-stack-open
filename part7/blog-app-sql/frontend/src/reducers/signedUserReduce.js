// reducer/signedUserReducer.js

import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";

const signedUserSlice = createSlice({
  name: "signedUser",
  initialState: "",
  reducers: {
    userFunc(state, action) {
      // TODO
      return action.payload;
    },
  },
});

export const funcci = () => {
  return async (dispatch) => {
    // TODO
  };
};

export const { userFunc } = signedUserSlice.actions;
export default signedUserSlice.reducer;
