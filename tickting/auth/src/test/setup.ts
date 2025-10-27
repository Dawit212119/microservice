import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

beforeAll(async () => {
  process.env.JWT_KEY = "SDFHDSBHJndsFSEF";
  const mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  await mongoose.connect(url);
});
afterEach(async () => {
  const collection = await mongoose.connection.db?.collections();
  if (collection) {
    for (let conn of collection) {
      conn.deleteMany();
    }
  } else {
    console.log("there is no collection to delete");
  }
});
