import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
let posts = {};
const app = express();
app.use(cors());
app.use(express.json());
app.get('/posts', (req, res) => {
  res.status(200).json({
    posts,
  });
});
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  try {
    const resp = await axios.post('http://localhost:3005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    });
  } catch (err) {
    console.log(err);
  }

  const post = Object.values(posts);
  return res.status(201).json({
    post,
  });
});
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts[id];
  res.status(200).json({
    post,
  });
});
app.post('/events', (req, res) => {
  console.log('recived event', req.body.type);
  res.send(req.body.type);
});
app.listen(3000, () => {
  console.log('v23');
  console.log('Server start:PORT:3000');
});
