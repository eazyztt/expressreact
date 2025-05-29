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

  const user = await User.findByPk(req.user.id);
  if (!user) {
    res.status(401).send("No user");
  }

  const bigChats = await Chat.findAll({
    where: { UserId: user.UserId },
  });

  const plainChats = bigChats.map((chat) => chat.toJSON());

  res.send(plainChats);
});

router.post("/bigChat", async (req, res) => {
  console.log(`${req.session} aaaaaaaaaaaaaaaaaaaaa`);

  console.log(req.user);

  const bigChat = await Chat.create({
    title: "New chat",
    UserId: req.user.id,
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
