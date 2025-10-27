import request from "supertest";
import app from "../../app";

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
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "1234",
    })
    .expect(201);

  const respones = await request(app)
    .post("/api/users/signin")
    .send({
      email: "dawit@gmail.com",
      password: "1234",
    })
    .expect(200);

  expect(respones.get("Set-Cookie")).toBeDefined();
});
