import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      notificationSet(state, action) {
        return action.payload
      },
      notificationClear(state, action) {
        return action.payload
      }
    } 
  })
  
  
  export const { notificationSet, notificationClear } = notificationSlice.actions
  export default notificationSlice.reducer
