import { NextFunction, Request, Response } from "express";
import { requestValidationError } from "./requestValidationError";
import { databaseConnectionError } from "./databaseConnectionError";
import { CustomeClass } from "./custome-abstract";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomeClass) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  return res.status(403).send({
    errors: [{ message: "Something happen", field: "" }],
  });
};
