const config = require("../utils/config");
const bcrypt = require("bcrypt");
//
const usersController = require("express").Router();
const User = require("../models/userModel");

usersController.get("/", async (req, res) => {
  const allUsers = await User.find({});
  console.log(`Response Payload : ${JSON.stringify(allUsers)}`);
  res.json(allUsers);
});

usersController.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const SALTROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALTROUNDS);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  console.log(`this is newUser : ${JSON.stringify(newUser)}`);

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = usersController;
