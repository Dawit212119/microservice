import mongoose from "mongoose";
import { Password } from "../services/hashPassword";
// an inteface that desctibe the properties
// that a user data has
interface user {
  email: string;
  password: string;
}
//  an interface that describe the properties
// that a user document has
interface UserDoc extends user, mongoose.Document {}
// an interface that describe the properties
//  that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: user): UserDoc;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const password = this.get("password");
    if (typeof password === "string") {
      const hashed = await Password.toHash(password);
      this.set("password", hashed);
    }
  }
  done();
});
userSchema.statics.build = (attr: user) => {
  return new User(attr);
};
export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const user = User.build({
  email: "daw@gmail.com",
  password: "213df",
});
