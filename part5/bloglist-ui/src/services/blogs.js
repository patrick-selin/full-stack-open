import axios from "axios";
const baseUrl = "/api/blogs";

const getAllBlogPosts = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const postNewBlogPost = async (post) => {
  const res = await axios.post(baseUrl, post);
  return res.data;
};

export default { getAllBlogPosts, postNewBlogPost };
