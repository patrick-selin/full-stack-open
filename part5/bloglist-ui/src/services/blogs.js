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

const createNewBlogPost = async (newPostObject) => {
  console.log(`token in header : ${token}`);
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newPostObject, config);

  return res.data;
};

const updateLikes = async (id) => {
  // get user id and send
  const res = await axios.put(`${baseUrl}/${id}`);
  return res.data;
};


export default { getAllBlogPosts, createNewBlogPost, setToken, updateLikes };
