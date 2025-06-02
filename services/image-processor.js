require("dotenv").config();
const sharp = require("sharp");
const fs = require("fs");
const axios = require("axios");
const { encryptAESGCM } = require("../services/deepseekEncrypt"); // Предполагается, что функция существует
const { clarifyWithDeepSeek } = require("../services/deepseekEncrypt"); // Предполагается, что функция существует

async function processImages({
  files: images,
  describePictureUrl = "https://us-central1-describepicture.cloudfunctions.net/describe_picture_api",
}) {
  const imageBuffers = await Promise.all(
    images.map((file) => sharp(file.buffer).jpeg().toBuffer())
  );
  const metadataList = await Promise.all(
    imageBuffers.map((buf) => sharp(buf).metadata())
  );

  const totalHeight = metadataList.reduce((sum, meta) => sum + meta.height, 0);
  const maxWidth = Math.max(...metadataList.map((m) => m.width));

  let y = 0;
  const composites = imageBuffers.map((buf, i) => {
    const top = y;
    y += metadataList[i].height;
    return { input: buf, top, left: 0 };
  });

  const mergedImageBuffer = await sharp({
    create: {
      width: maxWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite(composites)
    .jpeg()
    .toBuffer();

  //const timestamp = Date.now();
  //const filename = `merged_${timestamp}.png`;
  //const imagePath = path.join(outputDir, filename);
  //fs.writeFileSync(imagePath, mergedImageBuffer);

  const jsonData = JSON.stringify({
    imageBase64: mergedImageBuffer.toString("base64"),
    prompt: [
      { role: "user", text: process.env.DIMA_PROMPT },
      { role: "model", text: process.env.DIMA_PROMPT },
    ],
    mimeType: "image/jpeg",
    appId: process.env.DIMA_APP_ID,
  });

  const encrypted = encryptAESGCM(jsonData, process.env.DIMA_KEY);

  const describeResp = await axios.post(describePictureUrl, encrypted);
  const rawText = describeResp.data.answer;

  //await user.createPhotoDesc({ description: rawText });

  const clarifiedText = await clarifyWithDeepSeek(rawText);

  console.log(clarifiedText);

  // const cleanJsonString = clarifiedText.match(/{[\s\S]*}/)?.[0];
  // console.log(cleanJsonString);

  //const finalStr = JSON.parse(cleanJsonString);
  const finalStr = clarifiedText;

  return { rawText, finalStr };
}

module.exports = { processImages };
