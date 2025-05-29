const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/api/auth", async (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

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
