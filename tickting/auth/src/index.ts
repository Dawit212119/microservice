import express from "express";

const app = express();
app.use(express.json());

app
  .listen(3000, () => {
    console.log("auth start at 3000");
  })
  .on("error", (err) => {
    console.log(err.message);
  });
