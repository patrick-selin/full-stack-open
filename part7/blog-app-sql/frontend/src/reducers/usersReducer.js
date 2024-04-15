// reducer/usersReducer.js

import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    setUser(state, action) {
      const { id, userData } = action.payload;
      const existingUserIndex = state.findIndex((user) => user.id === id);
      if (existingUserIndex !== -1) {
        state[existingUserIndex] = userData;
      } else {
        state.push(userData);
      }
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const fetchedUsers = await userService.getAllUsers();
      dispatch(setUsers(fetchedUsers));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const userData = await userService.getUser(userId);
      console.log(`userDate :: :: ${JSON.stringify(userData)}`);
      dispatch(setUser({ id: userId, userData }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};

export const { setUsers, setUser } = userSlice.actions;
export default userSlice.reducer;
