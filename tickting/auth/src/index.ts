import { DatabaseConnect } from "./lib/database";
import app from "./app";
app
  .listen(3000, async () => {
    await DatabaseConnect();
    console.log("auth start at 3000");
  })
  .on("error", (err) => {
    console.log(err.message);
  });
