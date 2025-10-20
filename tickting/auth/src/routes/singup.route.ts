import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { requestValidationError } from "../middelware/requestValidationError";
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
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
      // return res.status(403).send(
      //   new requestValidationError(
      //     errors
      //       .array()
      //       .map((e) => e.msg)
      //       .join(",")
      //   )
      // );
      console.log(new requestValidationError([]).stack);
      throw new requestValidationError(errors.array());
    }
    next();
  }
  // (req: Request, res: Response) => {
  //   console.log(req.body);
  //   res.json({ body: req.body, new: "must work" });
  // }
);

export { router as Signup };
