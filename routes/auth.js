const express = require("express");
const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

const BOT_TOKEN = process.env.TG_BOT;

function checkTelegramAuth(userData) {
  const { hash, ...dataWithoutHash } = userData;

  const secret = crypto.createHash("sha256").update(BOT_TOKEN).digest();
  const dataCheckString = Object.keys(dataWithoutHash)
    .sort()
    .map((key) => `${key}=${dataWithoutHash[key]}`)
    .join("\n");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");

  return hmac === hash;
}

router.post("/auth/telegram", async (req, res) => {
  const user = req.body;
  console.log(user);

  if (!checkTelegramAuth(user)) {
    return res
      .status(403)
      .json({ error: "Невалидные данные Telegram" })
      .redirect("back");
  }

  console.log("WOrking");

  const userDb = await User.findOne({ where: { UserId: String(user.id) } });
  console.log("WOrking2");

  // Сохраняем пользователя в базе (или достаём)
  if (!userDb) {
    await User.create({
      UserId: String(user.id),
      username: user.username,
    });
  }

  // Можно сохранить в сессии или выдать JWT
  req.session.userId = String(user.id); // если используешь express-session

  res.redirect("/");
});

module.exports = router;
