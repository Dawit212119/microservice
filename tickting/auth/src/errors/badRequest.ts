import { CustomeClass } from "./custome-abstract";

export class BadRequestError extends CustomeClass {
  statusCode = 400;
  constructor(public messageError: string) {
    super(messageError);
    this.name = this.constructor.name;
  }

  serializeErrors() {
    return [
      {
        message: this.messageError,
      },
    ];
  }
}
