// reducer/signedUserReducer.js

import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";

const signedUserSlice = createSlice({
  name: "signedUser",
  initialState: null,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser(state) {
      localStorage.removeItem("loggedUser");
      return null;
    },
    initializeUserFromStorage(state) {
      const loggedUserJSON = localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
      }
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
      // Handle error,TODO
    }
  };
};

export const { setUser, clearUser, initializeUserFromStorage } =
  signedUserSlice.actions;
export default signedUserSlice.reducer;
