// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogPostReducer from "../reducers/blogPostReducer";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogPosts: blogPostReducer,
  },
});
