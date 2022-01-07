import express from "express";
const app = express();

app.get("/", async (req, res) => {
  res.send("Hello moon and mars!");
});

app.get("/test", async (req, res) => {
  res.send("test");
});

export default app;
