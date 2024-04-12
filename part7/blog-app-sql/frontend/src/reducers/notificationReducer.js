// reducer/notificationReducer.js

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationSet(state, action) {
      return action.payload; // Assuming payload is a string
    },
    notificationClear(state) {
      return ""; // Clear the notification
    },
  },
});

export const notificationSetter = (content, timeOutLength) => {
  return async (dispatch) => {
    dispatch(notificationSet(content));
    setTimeout(() => {
      dispatch(notificationClear());
    }, timeOutLength * 1000);
  };
};

export const { notificationSet, notificationClear } = notificationSlice.actions;
export default notificationSlice.reducer;