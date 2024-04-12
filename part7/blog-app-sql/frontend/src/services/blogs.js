// services/blogs.js

import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newUserToken) => {
  token = `Bearer ${newUserToken}`;
};

const getAllBlogPosts = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNewBlogPost = async (newBlogPostObject) => {
  console.log(`token in header : ${token}`);
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newBlogPostObject, config);

  return res.data;
};

const updateBlogPost = async (postId, newBlogPostObject) => {
  const res = await axios.put(`${baseUrl}/${postId}`, newBlogPostObject);
  return res.data;
};

const deleteBlogPost = async (postId) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${postId}`, config);
  return res.data;
};

export default {
  getAllBlogPosts,
  createNewBlogPost,
  setToken,
  updateBlogPost,
  deleteBlogPost,
};
