const express = require("express");
const { addTask } = require("../controllers/TodoController");
const { GetTasks } = require("../controllers/TodoController");

const router = express.Router();

router.post("/Todo", addTask);
router.get("/Todo/:id", GetTasks);

module.exports = {
  routes: router,
};
