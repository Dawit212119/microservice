import { CustomeClass } from "./custome-abstract";

export class AuthError extends CustomeClass {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
