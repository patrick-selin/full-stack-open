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
    // console.log(blogIds);

    for (const id of blogIds) {
      expect(id).toBeDefined();
    }
  });
});

describe("api/blogs POST testing", () => {
  test.skip("POST to /api/blogs creates a new blog post", async () => {
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

  test.skip("if likes property is missting, it will default to 0", async () => {
    // note to self
    // test not working when schema is set to required but the app works?

    const onePost = {
      _id: "54a851b54a676234d1766",
      title: "Test Man Title",
      author: "Ms Tester",
      url: "https:/test.com/",
      likes: 3,
      __v: 0,
    };

    await api
      .post("/api/blogs")
      .send(onePost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });
});

describe("api/blogs/:id DELETE", () => {
  test("DELETE first post with id and get code 204 and the length is -1", async () => {
    // ok
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await testHelper.blogsInDb();
    expect(blogsAfterDeletion).toHaveLength(testHelper.initialBlogPosts.length - 1);

    const author = blogsAfterDeletion.map((r) => r.author);
    expect(author).not.toContain(blogToDelete.author);
  });
});

describe("api/blogs/:id PUT", () => {
  test("update the author and likes with PUT", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ author: "Update Me", likes: 55, })
      .expect(200);

    const blogsAfterPut = await testHelper.blogsInDb();
    const updatedBlogPost = blogsAfterPut[0];
    expect(blogsAfterPut).toHaveLength(testHelper.initialBlogPosts.length);
    expect(updatedBlogPost.likes).toBe(55);
    expect(updatedBlogPost.author).toBe("Update Me");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
