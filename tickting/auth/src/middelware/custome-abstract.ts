export abstract class CustomeClass extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
