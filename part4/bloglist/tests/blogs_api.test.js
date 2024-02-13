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

describe("api testing", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("the first note is about HTTP methods", async () => {
    const res = await api.get("/api/blogs");
    console.log(`Response body is ${JSON.stringify(res.body)}`);
    expect(res.body[0].title).toBe("React patterns");
  });

  test("all blogposts are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(testHelper.initialBlogPosts.length);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
