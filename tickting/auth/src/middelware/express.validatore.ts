import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { requestValidationError } from "../errors/requestValidationError";
export const expressValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    throw new requestValidationError(isError.array());
  }
  next();
};
