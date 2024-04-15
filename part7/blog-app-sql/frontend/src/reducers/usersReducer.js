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

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
