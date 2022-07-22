"use strict";
// indicate that the code should be executed in "strict mode". an not, for example, use undeclared variables.

const firebase = require("../repositories/firebaseConfig");
const todo = require("../models/Todo");

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
      res.status(404).send({ result: "Task with the given ID not found" });
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