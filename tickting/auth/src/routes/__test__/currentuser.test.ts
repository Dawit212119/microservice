import request from "supertest";
import app from "../../app";

it("should return currently loggin user", async () => {
  const token = await global.signup();
  //  await request(app)
  //     .post("/api/users/signup")
  //     .send({
  //       email: "dawit@gmail.com",
  //       password: "1212",
  //     })
  //     .expect(201);
  //   console.log(auth.get("Set-Cookie"));
  //   const token = auth.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", token!);
  expect(response.body.currentUser).toHaveProperty("email", "dawit@gmail.com");
});

it("return 400", async () => {
  const res = await request(app).get("/api/users/currentuser").expect(400);
  expect(res.body).toHaveProperty("errors", [{ message: "Not Authorize" }]);
  console.log(res.body);
});
