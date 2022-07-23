const express = require("express");
const {
  addTask,
  getTasks,
  getAllTasks,
  deleteTask,
  updateTask,
} = require("../services/TodoService");

const router = express.Router();

router.post("/Todo", addTask);
router.get("/Todo", getAllTasks);
router.get("/Todo/:id", getTasks);
router.delete("/Todo/:id", deleteTask);
router.put("/Todo/:id", updateTask);
module.exports = {
  routes: router,
};
