import express from "express";
import { CurrentUserRoute } from "./routes/currentuser.route";
import { SignIn } from "./routes/singin.route";
import { SignOut } from "./routes/signout.route";
import { Signup } from "./routes/singup.route";
import { ErrorHandler } from "./middelware/error-handler";
import { Notfound } from "./errors/not-found-class";
import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != "test",
  })
);
app.use(CurrentUserRoute);
app.use(SignIn);
app.use(SignOut);
app.use(Signup);
app.all(/.*/, async (req, res) => {
  throw new Notfound();
});
app.use(ErrorHandler);

export default app;
