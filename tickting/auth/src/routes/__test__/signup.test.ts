import request from "supertest";
import app from "../../app";
import { User } from "../../models/user.models";
import jwt from "jsonwebtoken";
it("return 400 when email is malformed", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawitgmail.com",
      password: "password",
    })
    .expect(400);
});
it("should return 400 when password is less than or above the required", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "12",
    })
    .expect(400);
});

describe("should return 400 when either email or password missed", () => {
  it("should return 400 when  emailmissed", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        password: "1234",
      })
      .expect(400);
  });
  it("should return 400 when password missed", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "dawit@gmail.com",
      })
      .expect(400);
  });
});

it("should return 201", async () => {
  const createSpy = jest.spyOn(User, "build");
  const jwtSpy = jest.spyOn(jwt, "sign");
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit3@gmail.com",
      password: "password",
    })
    .expect(201);
  expect(createSpy).toHaveBeenCalledTimes(1);
  expect(createSpy.mock.calls[0][0]).toMatchObject({
    email: "dawit@gmail.com",
    password: expect.any(String),
  });
  const userResult = createSpy.mock.results[0].value;
  expect(userResult).toMatchObject({
    id: expect.any(String),
    email: "dawit@gmail.com",
  });
  expect(jwtSpy).toHaveBeenCalledTimes(1);
  expect(jwtSpy.mock.calls[0][0]).toMatchObject({
    id: expect.any(String),
    email: "dawit@gmail.com",
  });
  expect(jwtSpy.mock.calls[0][1]).toBe(process.env.JWT_KEY);
  const jwtResult = jwtSpy.mock.results[0].value;
  expect(typeof jwtResult).toBe("string");
  expect(jwtResult.split(".").length).toBe(3);
});

it("should return cookies on the header", async () => {
  const createSpy = jest.spyOn(User, "build");
  const jwtSpy = jest.spyOn(jwt, "sign");

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "dawit@gmail.com", password: "password" })
    .expect(201);
  expect(createSpy).toHaveBeenCalledTimes(1);

  expect(createSpy.mock.calls[0][0]).toMatchObject({
    email: "dawit@gmail.com",
    id: expect.any(String),
  });

  expect(createSpy.mock.results[0].value).toMatchObject({
    email: "dawit@gmail.com",
    id: expect.any(String),
  });

  expect(jwtSpy).toHaveBeenCalledTimes(1);
  expect(jwtSpy.mock.calls[0][0]).toMatchObject({
    id: expect.any(String),
    email: "dawit@gmail.com",
  });
  expect(jwtSpy.mock.calls[0][1]).toBe(process.env.JWT_KEY);
  expect(jwtSpy.mock.results[0].value.split(".").length).toBe(3);

  expect(response.get("Set-Cookie")).toBeDefined();
  console.log(response.get("Set-Cookie"));
});

it("should return 400 when try to signup with existing email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "password",
    })
    .expect(400);
});
