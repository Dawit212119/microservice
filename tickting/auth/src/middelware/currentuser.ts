import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}
interface userPayload {
  email: string;
  id: string;
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    console.log("1");
    next();
  }
  try {
    const payload = jwt.verify(
      req?.session?.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
    console.log("2");
  } catch (error) {}
  next();
};
