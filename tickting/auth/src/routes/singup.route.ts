import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { requestValidationError } from "../errors/requestValidationError";
import { databaseConnectionError } from "../errors/databaseConnectionError";
import { User } from "../models/user.models";
import { BadRequestError } from "../errors/badRequest";
import jwt from "jsonwebtoken";
import { expressValidator } from "../middelware/express.validatore";
const router = express.Router();
// class requestValidationError {
//   constructor(message) {
//     // Initialize properties or add logic here if needed
//     const reason = {
//       message,
//     };
//   }

//   reason = () => {
//     return this.reason;
//     // Define the reason logic here
//   };
// }
router.post(
  "/api/users/signup",
  [
    body("email").trim().isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("PASSWORD LENGTH MUST BE BETWEEN 4 AND 20"),
  ],
  expressValidator,

  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser) {
      throw new BadRequestError("Email In Uses");
    }
    const newUser = User.build({ email: email, password: password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_KEY!
    );
    console.log(token);
    req.session = {
      jwt: token,
    };
    return res.status(201).send(newUser);
  }
  // (req: Request, res: Response) => {
  //   console.log(req.body);
  //   res.json({ body: req.body, new: "must work" });
  // }
);

export { router as Signup };
