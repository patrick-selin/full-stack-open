// reducer/notificationReducer.js

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: "",
    timeout: 0,
    type: "",
  },
  reducers: {
    notificationSet(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    notificationClear(state) {
      return {
        text: "",
        timeOutLength: 0,
        type: "",
      };
    },
  },
});

export const notificationSetter = ({ text, timeOutLength, type }) => {
  return async (dispatch) => {
    dispatch(notificationSet({ text, timeOutLength, type }));
    setTimeout(() => {
      dispatch(notificationClear());
    }, timeOutLength * 1000);
  };
};

export const { notificationSet, notificationClear } = notificationSlice.actions;
export default notificationSlice.reducer;
