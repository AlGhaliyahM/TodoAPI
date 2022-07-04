var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
const { Todo } = require("./Todo");

app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.listen(PORT, function () {
  console.log(`Todo api at: ${PORT}!`);
});
