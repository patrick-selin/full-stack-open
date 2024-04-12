// reducer/notificationReducer.js

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: "",
    type: "",
  },
  reducers: {
    createNotification(state, action) {
      state.text += action.payload.text; // note ready yet
      state.type += action.paylype; // note ready yet
    },
  },
});

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
