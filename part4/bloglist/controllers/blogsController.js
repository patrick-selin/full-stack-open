// controller
// const config = require("../utils/config");
const blogsController = require("express").Router();
const Blog = require("../models/blogPostModel");
const User = require("../models/userModel");

blogsController.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsController.post("/", async (req, res) => {
  const body = req.body;
  console.log(`this is juu : ${JSON.stringify(body.user.id)}`);

  const user = await User.findById(body.user.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  console.log(`this is savedBlog : ${JSON.stringify(savedBlog.id)}`);
  user.blogPosts = user.blogPosts.concat(savedBlog.id);

  res.status(201).json(savedBlog.toJSON());
});

blogsController.delete("/:id", async (req, res) => {
  // console.log(req.params.id);
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsController.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);

  const blogPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlogPost = await Blog.findByIdAndUpdate(id, blogPost, {
    new: true,
  });

  updatedBlogPost
    ? res.status(200).json(updatedBlogPost.toJSON())
    : res.status(404).end();
});

module.exports = blogsController;
