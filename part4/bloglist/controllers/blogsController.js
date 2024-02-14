// controller
const config = require("../utils/config");
const blogsController = require("express").Router();
const Blog = require("../models/blogsModel");

blogsController.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsController.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog.toJSON());
});

module.exports = blogsController;
