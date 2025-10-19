export class databaseConnectionError extends Error {
  reason = "Database connection error";
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}
