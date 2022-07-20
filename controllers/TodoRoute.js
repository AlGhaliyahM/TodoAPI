const express = require("express");
const { addTask } = require("../services/TodoService");
const { GetTasks } = require("../services/TodoService");

const router = express.Router();

router.post("/Todo", addTask);
router.get("/Todo/:id", GetTasks);

module.exports = {
  routes: router,
};
