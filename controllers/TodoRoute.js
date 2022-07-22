const express = require("express");
const { addTask, getTasks } = require("../services/TodoService");

const router = express.Router();

router.post("/Todo", addTask);
router.get("/Todo/:id", getTasks);

module.exports = {
  routes: router,
};
