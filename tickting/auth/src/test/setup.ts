import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
declare global {
  var signup: () => Promise<string[]>;
}
jest.setTimeout(30000000);
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "SDFHDSBHJndsFSEF";
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  await mongoose.connect(url);
});
afterEach(async () => {
  const collection = await mongoose.connection.db?.collections();
  if (collection) {
    for (let conn of collection) {
      await conn.deleteMany();
    }
  } else {
    console.log("there is no collection to delete");
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
});
global.signup = async () => {
  const user = await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",

      password: "1212",
    })
    .expect(201);
  expect(user.get("Set-Cookie"));
  const token = user.get("Set-Cookie")!;
  return token!;
};
