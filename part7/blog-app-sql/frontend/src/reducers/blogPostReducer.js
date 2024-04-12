// reducer/blogPostReducer.js

// reducer/notificationReducer.js

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState: [],
  reducers: {
    appendBlogPost(state, action) {
      state.push(action.payload);
    },
    setBlogPosts(state, action) {
      return action.payload;
    },
  },
  // createBlogPost
  // TODO

});

export const initializeBlogPosts = () => {
  return async (dispatch) => {
    const fetchedBlogPost = await blogService.getAllBlogPosts();
    dispatch(setBlogPosts(fetchedBlogPost ));
  };
};

export const { appendBlogPost, setBlogPosts } = blogPostSlice.actions;
export default blogPostSlice.reducer;
