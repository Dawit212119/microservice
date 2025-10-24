import express, { Request, Response } from "express";
import { body } from "express-validator";
import { expressValidator } from "../middelware/express.validatore";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("password required"),
  ],
  expressValidator,
  (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    res.send({});
  }
);

export { router as SignIn };
