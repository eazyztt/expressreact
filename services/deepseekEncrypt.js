require("dotenv").config();
const axios = require("axios");

const crypto = require("crypto");

//const prompt = `Опиши человека кратко которому пренадлежит эта анкета, а также предложи три варианта сообщений максимально эффективных что бы начать знакомство с этим человеком (максимум на 140 символов каждое):\n\n${text}\n\nвыдавай результат в формате JSON c полями: brief_portrait(string краткое описание), message_options(массив объектов с полями title, message,why_it_works. 3 варианта на выбор), general_advice(строка) `;

async function clarifyWithDeepSeek(text) {
  try {
    const prompt = `${text} Вот описание фото человека и данные о нем. Ты являешься специалистом в области отношений. Ответ я ожидаю в формате JSON, а именно rawText: rawText,
      general_advice: general_advice,
      message_options: message_options,
      title: name_from_screenshot,
      brief_portrait: brief_portrait,
    } general_advice это общий совет. message_options это массив из трех возможных вариантов сообщений для знакомства, brief_portrait это краткое описание пользователя`;
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "Ты специалист мирового уровня по онлайн знакомствам",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: process.env.DEEPSEEK,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("[DEEPSEEK ERROR]", err.response?.data || err.message);
    return "[ОШИБКА: DeepSeek API недоступен]";
  }
}

function encryptAESGCM(dataJson, hexKey) {
  const key = Buffer.from(hexKey, "hex");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(dataJson, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    encryptedData: Buffer.concat([encrypted, authTag]).toString("base64"),
  };
}

module.exports = { clarifyWithDeepSeek, encryptAESGCM };
