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
    const fetchedUser = await userService.getAllUsers();
    console.log(`users :: :: ${JSON.stringify(fetchedUser)}`);

    dispatch(setUsers(fetchedUser));
    
  };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
