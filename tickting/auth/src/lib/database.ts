import mongoose from "mongoose";
export const DatabaseConnect = async () => {
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
};
