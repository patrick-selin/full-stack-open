// reducer/signedUserReducer.js

import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";

const signedUserSlice = createSlice({
  name: "signedUser",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state) {
      return null;
    },
  },
});

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(setUser(userData));
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error TODO
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(clearUser());
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error, dispatch appropriate action or set error state
    }
  };
};

export const { setUser, clearUser } = signedUserSlice.actions;
export default signedUserSlice.reducer;
