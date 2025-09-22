import express from "express";
import { randomBytes } from "crypto";
const app = express();
app.use(express.json());
let commentsByPostId = {};

app.post("/comment:id/post", (req, res) => {
  const PostId = req.params;
  const message = req.body;
  const id = randomBytes(4).toString("hex");
  const comment = commentsByPostId[PostId] || [];
  comment.push({ id, message });
  commentsByPostId = comment;
  res.status(201).json({
    commentsByPostId,
  });
});

app.listen(3001, () => {
  console.log(`Comments service start at PORT:3001  http://localhost:3001`);
});
