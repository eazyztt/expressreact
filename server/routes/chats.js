const express = require("express");
const { Chat, Message, ShortMessage } = require("../models/chat");
const User = require("../models/user");
const { clarifyWithDeepSeek } = require("../services/deepseekMsg");

const router = express.Router();

router.get("/newChat", async (req, res) => {
  console.log("ok");

  res.send("ok");
});

router.get("/bigChats", async (req, res) => {
  let user = await User.findByPk(req.tgId);
  if (!user) {
    user = await User.create({
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
  if (req.body.role === "GPT") {
    await ShortMessage.create({
      message: req.body.message,
      role: req.body.role,
      ChatId: req.body.chatId,
    });
    const chats = await ShortMessage.findAll({
      where: {
        ChatId: req.body.chatId,
      },
    });
    return res.send(chats);
  }

  try {
    const chat = await ShortMessage.create({
      message: req.body.message,
      role: req.body.role,
      ChatId: req.body.chatId,
    });
    const chats = await ShortMessage.findAll({
      where: {
        ChatId: req.body.chatId,
      },
    });

    const formattedMessages = chats.map((msg) => {
      const { message, role, createdAt } = msg.get({ plain: true });
      return {
        createdAt,
        role,
        content: message,
      };
    });

    const jsonString = JSON.stringify(formattedMessages);

    const msg = await clarifyWithDeepSeek(jsonString);

    console.log(msg);

    await ShortMessage.create({
      ChatId: req.body.chatId,
      message: msg,
      role: "GPT",
    });
    res.send(chats);
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
