const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjU3MTI0NTMzNCwidXNlcm5hbWUiOiJzbXRoYWJvdXRfbmFtZSIsImZpcnN0X25hbWUiOiIuIiwiaWF0IjoxNzQ4NTQyMjgyLCJleHAiOjE3NDg2Mjg2ODJ9.r09aB4PS3BLoT9vrn-wxV9rg15M0jvKldT3on6vRGPU";

const decoded = jwt.verify(token, JWT_SECRET);
console.log(decoded);

router.post("/api/auth", (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Установить токен как httpOnly cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // ОБЯЗАТЕЛЬНО если HTTPS
      sameSite: "none", // ОБЯЗАТЕЛЬНО если фронт на другом домене
      maxAge: 60 * 60 * 1000, // 1 час
    });

    res.json({ ok: true, user: decoded });
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
