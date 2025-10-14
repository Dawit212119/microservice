import express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';
const app = express();
app.use(express.json());
let commentsByPostId = {};

app.post('/comment/:id/post', async (req, res) => {
  const PostId = req.params.id;
  const message = req.body;
  const id = randomBytes(4).toString('hex');
  const comment = commentsByPostId[PostId] || [];
  comment.push({ id, message });
  commentsByPostId[PostId] = comment;
  await axios.post('http://localhost:3005/events', {
    type: 'CommentCreated',
    data: {
      PostId,
      id,
      message,
    },
  });
  res.status(201).json({
    commentsByPostId,
  });
});
app.get('/get/:id/comments', (req, res) => {
  const PostId = req.params;
  const comment = commentsByPostId[PostId];

  res.status(200).json({
    comment,
  });
});
app.post('/events', (req, res) => {
  console.log('recived event', req.type);
  res.send(req.type);
});
app.listen(3001, () => {
  console.log(`Comments service start at PORT:3001  http://localhost:3001`);
});
