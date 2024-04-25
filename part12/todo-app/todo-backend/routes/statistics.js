const express = require("express");
require("dotenv").config();
const { Todo } = require("../mongo");
const { getAsync } = require("../redis");

const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const count = await getAsync("count");

  return res.json({ added_todos: count || "0" });
});

module.exports = router;
