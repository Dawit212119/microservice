import { CustomeClass } from "./custome-abstract";

export class databaseConnectionError extends CustomeClass {
  statusCode = 500;
  reason = "Database connection error";
  constructor() {
    super("Database connection");
    this.name = this.constructor.name;
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
        field: "",
      },
    ];
  }
}
