import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationSet(state, action) {
      return action.payload;
    },
  },
});

export const notificationSetter = (content, timeOutLength) => {
  return async (dispatch) => {
    dispatch(notificationSet(content));
    setTimeout(() => {
      dispatch(notificationSet(""));
    }, timeOutLength * 1000);
  };
};

export const { notificationSet } = notificationSlice.actions;
export default notificationSlice.reducer;
