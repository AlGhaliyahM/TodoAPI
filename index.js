//Start
// var express = require("express");
// var app = express();
// const PORT = process.env.PORT || 3000;
// const { Todo } = require("./Todo");

// const { postOneTodo } = require("./Todo");
// app.post("/Todo", postOneTodo);

// // exports.api = functions.https.onRequest(app);

// app.get("/", (req, res) => {
//   res.send("Todo API ");
// });
// app.listen(PORT, function () {
//   console.log(`Todo api at: ${PORT}!`);
// });

"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const Todoroutes = require("./routes/TodoRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", Todoroutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
