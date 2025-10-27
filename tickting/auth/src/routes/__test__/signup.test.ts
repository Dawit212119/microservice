import request from "supertest";
import app from "../../app";
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
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit3@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("should return cookies on the header", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "dawit@gmail.com", password: "password" })
    .expect(201);

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
