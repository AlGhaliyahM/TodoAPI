"use strict";

const firebase = require("../firebaseConfig");
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

module.exports = {
  addTask,
};
