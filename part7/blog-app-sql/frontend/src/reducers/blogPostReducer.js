// reducer/blogPostReducer.js

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState: [],
  reducers: {
    appendBlogPost(state, action) {
      return [...state, action.payload];
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
    dispatch(setBlogPosts(fetchedBlogPost));
  };
};

export const createBlogPost = (content) => {
  console.log(`content 22 :: ${JSON.stringify(content)}`);
  return async (dispatch) => {
    const newBlogPost = await blogService.createNewBlogPost(content);
    dispatch(appendBlogPost(newBlogPost));
    // dispatch(notificationSetter(`New Anecdote added: '${content}'`, 4));
  };
};

export const { appendBlogPost, setBlogPosts } = blogPostSlice.actions;
export default blogPostSlice.reducer;
