import { NextFunction, Request, Response } from "express";
import { requestValidationError } from "./requestValidationError";
import { databaseConnectionError } from "./databaseConnectionError";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof requestValidationError) {
    console.log("Error from request validation!");
    const messages = err.error.map((er) => ({
      messages: er.msg,
      field: er.type === "field" ? er.path : "unknown",
    }));
    return res.status(400).send({
      errors: messages,
    });
  }
  if (err instanceof databaseConnectionError) {
    console.log("error from databaseconnection ");
    return res.status(400).send({
      errors: [
        {
          messages: err.reason,
          field: "",
        },
      ],
    });
  }
  return res.status(403).send({
    errors: [{ message: "Something happen", field: "" }],
  });
};
