import app from "../../app";
import request from "supertest";

it("it should return cookie with null", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dawit@gmail.com",
      password: "1233",
    })
    .expect(201);

  const response = await request(app).post("/api/users/signout").expect(200);

  expect(response.get("Set-Cookie")?.[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
