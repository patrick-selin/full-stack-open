const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
// const bcrypt = require("bcrypt");
//
const testHelper = require("./test-helper");
const User = require("../models/userModel");

describe("api/blogs/ Add new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    await User.insert(testHelper.newUser);
  });

  test.only("add new valid user", async () => {
    // TODO
    const usersAtStart = await testHelper.usersInDb();

    const validUser = {
      username: "jukka7887",
      name: "Poikola",
      password: "secret8888",
    };

    await api
      .post("/api/users")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.blogsInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart + 1);

    const allUsernames = usersAtEnd.map((user) => user.username);
    expect(allUsernames).toContain(validUser.username);
  });

  test("already existing user cannot be added, return error code 400", async () => {
    // TODO
  });

  test("the password length needs to be greater than 3", async () => {
    // TODO
  });

  test("the username length needs to be greater than 3", async () => {
    // TODO
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
