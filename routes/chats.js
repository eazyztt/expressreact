const express = require("express");
const { Chat, Message, ShortMessage } = require("../models/chat");
const User = require("../models/user");

const router = express.Router();

router.get("/newChat", async (req, res) => {
  console.log("ok");

  res.send("ok");
});

router.get("/bigChats", async (req, res) => {
  const user = await User.findByPk(req.tgId);
  if (!user) {
    user = user.create({
      UserId: req.tgId,
      username: req.username,
    });
  }

  const bigChats = await Chat.findAll({
    where: { UserId: user.UserId },
  });

  const plainChats = bigChats.map((chat) => chat.toJSON());

  res.send(plainChats);
});

router.post("/bigChat", async (req, res) => {
  const bigChat = await Chat.create({
    title: "New chat",
    UserId: req.tgId,
  });

  res.send(bigChat);
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
