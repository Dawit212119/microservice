import { ValidationError } from "express-validator";
import { CustomeClass } from "./custome-abstract";

export class requestValidationError extends CustomeClass {
  statusCode = 400;
  constructor(public error: ValidationError[]) {
    super("Invalide credentials");
    this.name = this.constructor.name;
  }

  serializeErrors() {
    return this.error.map((err) => ({
      message: err.msg,
      field: err.type === "field" ? err.path : "unknow",
    }));
  }
}
