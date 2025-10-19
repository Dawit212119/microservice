import { ValidationError } from "express-validator";
interface validation {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
export class requestValidationError extends Error {
  constructor(public error: ValidationError[]) {
    super();
    // Object.setPrototypeOf(this, requestValidationError.prototype);  older version of nodejs
    this.name = this.constructor.name;
  }
}
// {
//     [auth]     type: 'field',
//     [auth]     value: 'dawigmail.com',
//     [auth]     msg: 'Email must be valid!',
//     [auth]     path: 'email',
//     [auth]     location: 'body'
//     [auth]   },
