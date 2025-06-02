const express = require("express");
const sequelize = require("./database");
const User = require("./models/user"); // ← импортируй все модели ЗДЕСЬ
const chatRouter = require("./routes/chats");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const imageRouter = require("./routes/image");
const auth = require("./routes/auth");
const authMiddleware = require("./authMiddle");
const cookieParser = require("cookie-parser");
const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin: "https://css-learn.onrender.com", // адрес твоего фронта
    credentials: true, // ВАЖНО!
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "yourSecretKey", // замените на что-то надёжное
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true, // 👈 true, если HTTPS (на Render — да)
//       sameSite: "none", // 👈 обязательно для кросс-доменных сессий
//     },
//   })
// );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", auth);
app.use("/", chatRouter);
app.use("/", authMiddleware, imageRouter);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
  });
});
