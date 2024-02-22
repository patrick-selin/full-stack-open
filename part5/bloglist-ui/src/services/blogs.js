import axios from "axios";
const baseUrl = "/api/blogs";

//
const setToken = (userToken) => {
  // TODO
  // when adding new blog post, add token
}
//

const getAllBlogPosts = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

// add tokens to new blog posts

const postNewBlogPost = async (post) => {
  // TODO
  // muista lisata token

  const res = await axios.post(baseUrl, post);

  return res.data;
};

export default { getAllBlogPosts, postNewBlogPost };
