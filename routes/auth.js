const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

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
      sameSite: "None", // ОБЯЗАТЕЛЬНО если фронт на другом домене
      maxAge: 60 * 60 * 1000, // 1 час
    });

    res.json({ ok: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
