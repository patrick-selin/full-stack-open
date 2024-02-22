import axios from "axios";
const baseUrl = "/api/blogs";

let token = null

const setToken = (newUserToken) => {
  token = `Bearer ${newUserToken}`
}

const getAllBlogPosts = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNewBlogPost = async (newPostObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newPostObject, config);

  return res.data;
};

export default { getAllBlogPosts, createNewBlogPost, setToken };
