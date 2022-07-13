"use strict";

const firebase = require("../firebaseConfig");
const todo = require("../models/Todo");
const [taskList, setTaskList] = [];

const addTask = async (req, res, next) => {
  try {
    const data = req.body;
    await firebase.collection("TodoAPI").doc().set(data);
    res.send("Todo task is added sucessfuly ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const GetTasks = async (req, res, next) => {
  try {
    const id = req.params.id;
    const TodoRef = await firebase.collection("TodoAPI").doc(id);
    const data = await TodoRef.get();
    // console.log(data);
    if (!data.exists) {
      res.status(404).send("Task with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addTask,
  GetTasks,
};
