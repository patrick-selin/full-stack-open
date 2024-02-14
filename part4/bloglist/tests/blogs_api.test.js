const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
//
const testHelper = require("./test-helper");
const Blog = require("../models/blogsModel");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogPosts);
});

describe("api/blogs GET testing", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("the first note is about HTTP methods", async () => {
    const res = await api.get("/api/blogs");
    // console.log(`Response body is ${JSON.stringify(res.body)}`);
    expect(res.body[0].title).toBe("React patterns");
  });

  test("all blogposts are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(testHelper.initialBlogPosts.length);
  });

  test("blogpost has id property named id, not _id", async () => {
    const res = await api.get("/api/blogs");

    const blogIds = res.body.map((blog) => blog.id);
    console.log(blogIds);

    for (const id of blogIds) {
      expect(id).toBeDefined();
    }
  });
});

describe("api/blogs POST testing", () => {
  test("POST to /api/blogs creates a new blog post", async () => {
    // post
    await api
      .post("/api/blogs")
      .send(testHelper.oneBlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogPosts = await testHelper.blogsInDb();
    expect(allBlogPosts).toHaveLength(testHelper.initialBlogPosts.length + 1);

    const authors = allBlogPosts.map((blogPost) => blogPost.author);
    expect(authors).toContain("Michael Chan");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
