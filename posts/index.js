import express from "express";
import { randomBytes } from "crypto";
let posts = {};
const app = express();
app.use(express.json());
app.get("/posts", (req, res) => {
  res.status(200).json({
    posts,
  });
});
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  const post = Object.values(posts);
  return res.status(201).json({
    post,
  });
});
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts[id];
  res.status(200).json({
    post,
  });
});

app.listen(3000, () => {
  console.log("Server start:PORT:3000");
});
