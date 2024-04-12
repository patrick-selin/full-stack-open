// reducer/blogPostReducer.js


// reducer/notificationReducer.js

import { createSlice } from "@reduxjs/toolkit";

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState: [],
  reducers: {
    setBlogPosts(state, action) {
      // TODO
    },
  },
});

export const blogPostSetter = ( blogs ) => {
  return async (dispatch) => {
    // TODO
  };
};

export const { setBlogPosts } = blogPostSlice.actions;
export default blogPostSlice.reducer;
