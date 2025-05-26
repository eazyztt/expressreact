const express = require("express");
const { Chat, Message, ShortMessage } = require("../models/chat");
const User = require("../models/user");

const router = express.Router();

router.get("/newChat", async (req, res) => {
  console.log("ok");

  res.send("ok");
});

router.get("/bigChats", async (req, res) => {
  console.log(`${req.session.userId} bbbbbbbbbbbbbbbbb`);

  const user = await User.findByPk(req.session.userId);

  if (!user) {
    const randomId = Math.floor(Math.random() * 10000);
    await User.create({ UserId: String(randomId), username: "emslim" });
    req.session.userId = String(randomId);
  }

  const bigChats = await Chat.findAll({
    where: { UserId: req.session.userId },
  });

  const plainChats = bigChats.map((chat) => chat.toJSON());

  console.log(`this is big chats ${plainChats}`);

  res.send(plainChats);
});

router.post("/bigChat", async (req, res) => {
  console.log(`${req.session} aaaaaaaaaaaaaaaaaaaaa`);

  const bigChat = await Chat.create({
    title: "New chat",
    UserId: req.session.userId,
  });
  console.log(bigChat);

  res.send(bigChat);
});

router.get("/", async (req, res) => {
  try {
    const messages = await ShortMessage.findAll({
      where: { ChatId: "1" },
      order: [["createdAt", "DESC"]],
    });

    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const chat = await ShortMessage.create({
      message: req.body.message,
      role: req.body.role,
      ChatId: req.body.chatId,
    });
    res.send(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send("err");
  }
});

router.get("/shortMessages", async (req, res) => {
  const chatId = req.query.chatId;
  try {
    const chats = await ShortMessage.findAll({
      where: {
        ChatId: chatId,
      },
    });
    res.send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send("err");
  }
});

module.exports = router;
