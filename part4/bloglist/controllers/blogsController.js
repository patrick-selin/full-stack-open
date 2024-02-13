// controller
const config = require("../utils/config");
const blogsController = require("express").Router();
const Blog = require("../models/blogsModel");


blogsController.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});


blogsController.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsController;
