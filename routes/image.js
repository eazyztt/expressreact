const express = require("express");
const multer = require("multer");
const { processImages } = require("../services/image-processor");
const { clarifyWithDeepSeek } = require("../services/deepseekEncrypt");
const { Chat, Message, ShortMessage } = require("../models/chat");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Лимит 2MB на файл
    files: 6, // Максимум 5 файлов
    fieldSize: 20 * 1024 * 1024, // Лимит для полей формы
  },
});

const router = express.Router();

router.post("/upload", upload.array("images", 6), async (req, res) => {
  console.log("WOOOOOW");

  const images = req.files;

  try {
    // Здесь можно добавить обработку изображения и генерацию ответа
    const { rawText, finalStr } = await processImages({
      files: images,
    });

    const msg = await Message.create({
      rawText: rawText,
      general_advice: finalStr.general_advice,
      message_options: finalStr.message_options,
      brief_portrait: finalStr.brief_portrait,
      type: "text",
      role: "GPT",
      ChatId: req.body.id,
    });

    ShortMessage.create({
      ChatId: req.body.id,
      message: finalStr.brief_portrait,
    });

    await Chat.update(
      {
        title: finalStr.title,
      },
      { where: { ChatId: req.body.id } }
    );

    console.error(finalStr, msg);
    res.send(finalStr);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
