require("dotenv").config();
const { Telegraf } = require("telegraf");
const jwt = require("jsonwebtoken");

console.log(process.env.TG_BOT);
console.log(process.env.JWT_SECRET);

const bot = new Telegraf(process.env.TG_BOT);

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = "https://css-learn.onrender.com";

bot.start((ctx) => {
  const user = ctx.from;

  // payload для JWT
  const payload = {
    id: user.id,
    username: user.username || null,
    first_name: user.first_name,
  };

  // Генерируем JWT
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  // Формируем ссылку с токеном в query
  const link = `${FRONTEND_URL}/api/auth?token=${token}`;

  // Отправляем ссылку пользователю
  ctx.reply(
    `Привет, ${user.first_name}! Вот твоя ссылка для входа:\n\n${link}`
  );
});

bot.launch();
