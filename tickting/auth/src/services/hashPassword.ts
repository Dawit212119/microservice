import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const scrytppromise = promisify(scrypt);
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const hashed = (await scrytppromise(password, salt, 64)) as Buffer;
    return `${hashed.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, password: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hashed = (await scrytppromise(password, salt, 64)) as Buffer;
    return hashed.toString("hex") === hashedPassword;
  }
}
