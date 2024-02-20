// controller
const config = require("../utils/config");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const Blog = require("../models/blogPostModel");
const User = require("../models/userModel");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  // console.log(`this is juu : ${JSON.stringify(body.userId)}`);

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  console.log(`this is decodedToken : ${JSON.stringify(decodedToken)}`);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  console.log(`this is savedBlog : ${JSON.stringify(savedBlog._id)}`);
  user.blogPosts.push(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(`this is decodedToken : ${JSON.stringify(decodedToken)}`);

  if (!req.token && decodedToken.id) {
    return res.status(401).json({ error: "token invalid or not found" });
  }

  const blog = await Blog.findById(postId);

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.deleteOne({ _id: postId });
    res.sendStatus(204).end();
  } else {
    res.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
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

module.exports = blogsRouter;
