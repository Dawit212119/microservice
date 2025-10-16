import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

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
    if (!errors.isEmpty()) {
      return res.status(403).send("error on body");
    }
    next();
  },
  (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ body: req.body, new: "must work" });
  }
);

export { router as Signup };
