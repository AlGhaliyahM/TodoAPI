"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const Todoroutes = require("./controllers/TodoRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", Todoroutes.routes);

app.get("/api", function (req, res) {
  res.json({
    text: "Welcome to Todo API!",
  });
});

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
