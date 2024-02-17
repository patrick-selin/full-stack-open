const config = require("../utils/config");
const bcrypt = require("bcrypt");
//
const usersController = require("express").Router();
const User = require("../models/userModel");

usersController.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

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
