// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogPostReducer from "../reducers/blogPostsReducer";
import signedUserReduce from "../reducers/signedUserReducer";
import usersReducer from "../reducers/usersReducer";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogPosts: blogPostReducer,
    signedUser: signedUserReduce,
    users: usersReducer,
  },
});
