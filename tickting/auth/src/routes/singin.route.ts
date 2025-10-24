import express, { Request, Response } from "express";
import { body } from "express-validator";
import { expressValidator } from "../middelware/express.validatore";
import { User } from "../models/user.models";
import { BadRequestError } from "../errors/badRequest";
import { Password } from "../services/hashPassword";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("password required"),
  ],
  expressValidator,
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }
    const checkpassword = await Password.compare(
      existingUser.password,
      password
    );
    if (!checkpassword) {
      throw new BadRequestError("Invalid Credentials");
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    res.send({ existingUser });
  }
);

export { router as SignIn };
