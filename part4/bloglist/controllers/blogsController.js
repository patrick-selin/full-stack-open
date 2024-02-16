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
  // console.log(`this is juu : ${JSON.stringify(blog)}`);

  const savedBlog = await blog.save();
  console.log("kaviko888888888888");
  res.status(201).json(savedBlog.toJSON());
});

blogsController.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


module.exports = blogsController;
