import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  // the cookie session will decoded the base 64

  if (!req.session?.jwt) {
    return res.send({
      currentUser: null,
    });
  }
  console.log(req.session);
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.send({
      currentUser: payload,
    });
  } catch (error) {
    return res.send({
      currentUser: null,
    });
  }
});

export { router as CurrentUserRoute };
