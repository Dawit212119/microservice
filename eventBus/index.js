import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const events = [];
app.post("/events", async (req, res) => {
  events.push(req.body);
  console.log(req.body);
  const { type, data } = req.body;

  // await axios.post("http:localhost:3001/events", { type, data });
  try {
    await axios.post("http:localhost:3000/events", { type, data });

    await axios.post("http:localhost:3004/events", { type, data });

    res.send("events send respectively");
  } catch (er) {
    console.log(er);
  }
});
app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(PORT, () => {
  console.log("server start at port", PORT);
});
