const express = require("express");
const app = express();

app.get("/hello-world", async (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
