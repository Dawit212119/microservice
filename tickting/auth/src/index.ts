import express from "express";
import { CurrentUserRoute } from "./routes/currentuser.route";
import { SignIn } from "./routes/singin.route";
import { SignOut } from "./routes/signout.route";
import { Signup } from "./routes/singup.route";
import { ErrorHandler } from "./middelware/error-handler";
import { Notfound } from "./errors/not-found-class";
import { DatabaseConnect } from "./lib/database";

const app = express();
app.use(express.json());

app.use(CurrentUserRoute);
app.use(SignIn);
app.use(SignOut);
app.use(Signup);
app.all(/.*/, async (req, res) => {
  throw new Notfound();
});
app.use(ErrorHandler);
app
  .listen(3000, async () => {
    await DatabaseConnect();
    console.log("auth start at 3000");
  })
  .on("error", (err) => {
    console.log(err.message);
  });
