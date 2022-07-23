const express = require("express");
const { addTask, getTasks, getAllTasks } = require("../services/TodoService");

const router = express.Router();

router.post("/Todo", addTask);
router.get("/Todo", getAllTasks);
router.get("/Todo/:id", getTasks);

module.exports = {
  routes: router,
};
