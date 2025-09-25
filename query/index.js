import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const posts = {};
app.post("/events", (req, res) => {
  console.log(req.body);
  if (req.body.type === "PostCreated") {
    const { type, data } = req.body;
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    const post = posts[id];
    console.log(post);
    res.status(201).json({
      message: "post created",
      post,
    });
  }
  if (req.body.type === "CommentCreated") {
    const { type, data } = req.body;
    const { PostId, id, message } = data;
    const post = posts[PostId];
    post.comments.push({ id, message });
    const commentAdd = posts[PostId];
    res.status(201).json({
      message: "comment added",
      commentAdd,
    });
  }
});

app.listen(PORT, () => {
  console.log("server start", PORT);
});
