import request from "supertest";
import app from "../../app";
import { User } from "../../models/user.models";
import jwt from "jsonwebtoken";

it("should return 400 if email malformed or no exist email", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sdfsdfsdf.com",
      password: "dfgg",
    })
    .expect(400);
});

it("should return 400 when signin with no with incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "1234",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "dawit@gmail.com",
      password: "34323",
    })
    .expect(400);
});

it("should return 200 and cookie in header", async () => {
  const createSpy = jest.spyOn(User, "build");
  const jwtSpy = jest.spyOn(jwt, "sign");
  const saveSpy = jest.spyOn(User.prototype, "save");
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "1234",
    })
    .expect(201);

  expect(createSpy).toHaveBeenCalledTimes(1);
  expect(createSpy.mock.calls[0][0]).toMatchObject({
    email: "dawitz@gmail.com",
    password: expect.any(String),
  });

  expect(saveSpy).toHaveBeenCalledTimes(1);

  expect(await saveSpy.mock.results[0].value).toHaveProperty(
    "email",
    "dawit@gmail.com"
  );

  expect(jwtSpy).toHaveBeenCalledTimes(1);
  expect(jwtSpy.mock.calls[0][0]).toMatchObject({
    id: expect.any(String),
    email: "dawit@gmail.com",
  });
  expect(jwtSpy.mock.calls[0][1]).toBe(process.env.JWT_KEY);

  expect(jwtSpy.mock.results[0].value.split(".").length).toBe(3);

  const findSpy = jest.spyOn(User, "findOne");
  const respones = await request(app)
    .post("/api/users/signin")
    .send({
      email: "dawit@gmail.com",
      password: "1234",
    })
    .expect(200);

  expect(findSpy).toHaveBeenCalledTimes(1);
  expect(findSpy.mock.calls[0][0]).toMatchObject({
    email: "dawit@gmail.com",
  });
  const foundUser = await findSpy.mock.results[0].value;
  expect(foundUser).toMatchObject({
    email: "dawit@gmail.com",
    id: expect.any(String),
  });

  expect(jwtSpy).toHaveBeenCalledTimes(2);
  expect(jwtSpy.mock.calls[0][0]).toMatchObject({
    id: expect.any(String),
    email: "dawit@gmail.com",
  });
  expect(jwtSpy.mock.calls[0][1]).toBe(process.env.JWT_KEY);

  expect(jwtSpy.mock.results[0].value.split(".").length).toBe(3);

  expect(respones.get("Set-Cookie")).toBeDefined();
  createSpy.mockRestore();
  saveSpy.mockRestore();
  jwtSpy.mockRestore();
  findSpy.mockRestore();
});
