import { CustomeClass } from "./custome-abstract";

export class Notfound extends CustomeClass {
  statusCode = 404;
  constructor() {
    super("Route not exist");
    this.name = this.constructor.name;
  }

  serializeErrors() {
    return [
      {
        message: "Notfound",
      },
    ];
  }
}
