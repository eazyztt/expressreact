const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/api/auth", async (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      User.create({
        UserId: decoded.id,
        username: decoded.username,
      });
    }

    // Установить токен как httpOnly cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // ОБЯЗАТЕЛЬНО если HTTPS
      sameSite: "none", // ОБЯЗАТЕЛЬНО если фронт на другом домене
      maxAge: 60 * 60 * 1000, // 1 час
    });

    req.user = decoded;

    res.json({ ok: true, user: decoded });
  } catch (err) {
    console.log(err);

    res.status(401).json(err);
  }
});

module.exports = router;
