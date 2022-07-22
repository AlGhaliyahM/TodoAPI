"use strict";
// indicate that the code should be executed in "strict mode". an not, for example, use undeclared variables.

// Business Logic here..

const firebase = require("../repositories/firebaseConfig");
const todo = require("../entities/Todo");

const addTask = async (req, res, next) => {
  try {
    // const newTodoTaskTest = new Todo(
    //   req.body.task,
    //   false,
    //   new Date().toISOString(),
    //   "-"
    // );
    const newTodoTask = {
      task: req.body.task,
      is_done: false,
      created_at: new Date().toISOString(),
      updated_at: "-",
    };

    //Adding to DB
    await firebase
      .collection("TodoAPI")
      .add(newTodoTask)
      .then((doc) => {
        const responseTodoTask = newTodoTask;
        responseTodoTask.id = doc.id;
        return res.json(responseTodoTask);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTasks = async (req, res, next) => {
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
  getTasks,
};
