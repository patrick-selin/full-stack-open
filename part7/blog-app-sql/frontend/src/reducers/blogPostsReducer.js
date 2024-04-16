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
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    updateSingleBlogPost(state, action) {
      return state.map((blogPost) =>
        blogPost.id === action.payload.id ? action.payload : blogPost,
      );
    },
  },
});

export const initializeBlogPosts = () => {
  return async (dispatch) => {
    const fetchedBlogPost = await blogService.getAllBlogPosts();
    dispatch(setBlogPosts(fetchedBlogPost));
  };
};

export const createBlogPost = (content) => {
  return async (dispatch) => {
    const newBlogPost = await blogService.createNewBlogPost(content);
    dispatch(appendBlogPost(newBlogPost));
  };
};

export const updateBlogPost = (postId, blogPostData) => {
  return async (dispatch) => {
    const updatedBlogPost = await blogService.updateBlogPost(
      postId,
      blogPostData,
    );
    
    dispatch(updateSingleBlogPost(updatedBlogPost));
  };
};

export const deleteBlogPost = (postId) => {
  console.log(`content 22 :: ${JSON.stringify(postId)}`);
  return async (dispatch, getState) => {
    await blogService.deleteBlogPost(postId);

    const currentState = getState();

    const updatedBlogPosts = currentState.blogPosts.filter(
      (blogPost) => blogPost.id !== postId,
    );

    dispatch(setBlogPosts(updatedBlogPosts));
  };
};

export const { appendBlogPost, setBlogPosts, updateSingleBlogPost } =
  blogPostSlice.actions;
export default blogPostSlice.reducer;
