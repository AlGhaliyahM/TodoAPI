"use strict";
// indicate that the code should be executed in "strict mode". an not, for example, use undeclared variables.

// Business Logic here..

const firebase = require("../repositories/firebaseConfig");
const Todo = require("../entities/Todo");

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

const getAllTasks = async (req, res, next) => {
  try {
    const TodoRef = await firebase.collection("TodoAPI");
    const data = await TodoRef.get();

    const allTasks = [];
    if (data.empty) {
      res.status(404).send({ result: "No Task is added" });
    } else {
      data.forEach((doc) => {
        allTasks.push({
          id: doc.id,
          task: doc.data().task,
          is_done: doc.data().is_done,
          created_at: doc.data().created_at,
          updated_at: doc.data().updated_at,
        });
      });
      res.send(allTasks);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const TodoRef = await firebase.collection("TodoAPI").doc(id);

    TodoRef.get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).send({ result: "Task is not found" });
        }
        return TodoRef.delete();
      })
      .then(() => {
        res.send({ result: "Task is deleted successfully" });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    let TodoRef = await firebase.collection("TodoAPI").doc(id);

    TodoRef.update(req.body).then(() => {
      res.json({ result: "Task is updated successfully" });
    });
    TodoRef.update({ updated_at: new Date().toISOString() });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  getAllTasks,
  deleteTask,
  updateTask,
};
