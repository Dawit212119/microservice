import { NextFunction, Response, Request } from "express";
import { AuthError } from "../errors/authError";

export const authRequire = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    console.log("3");
    throw new AuthError("Not Authorize");
  }
  next();
};
