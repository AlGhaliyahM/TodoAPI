const express = require("express");
const { addTask } = require("../controllers/TodoController");

const router = express.Router();

router.post("/Todo", addTask);

module.exports = {
  routes: router,
};
