const config = require("../utils/config");
//
const usersController = require("express").Router();
const User = require("../models/userModel");

usersController.post("/", async (req, res) => {
  const newUser = new User(req.body);
  console.log(`this is juu : ${JSON.stringify(newUser)}`);

  const savedUser = await newUser.save();
  res.status(201).json(savedUser.toJSON()); // remove
});

module.exports = usersController;
