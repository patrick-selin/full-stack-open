// controller
const config = require("../utils/config");
const blogsController = require("express").Router();
const Blog = require("../models/blogPostModel");

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
