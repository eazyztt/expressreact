const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Chat = sequelize.define("Chat", {
  title: {
    type: DataTypes.STRING,
    defaultValue: "New Chat",
  },
  UserId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

const Message = sequelize.define("Message", {
  type: {
    type: DataTypes.STRING,
    defaultValue: "text",
  },
  rawText: {
    type: DataTypes.TEXT,
  },
  brief_portrait: {
    type: DataTypes.TEXT,
    defaultValue: "Вскоре тут будет фото",
  },
  message_options: {
    type: DataTypes.JSONB, // Используем JSONB для PostgreSQL
    allowNull: false,
    defaultValue: [],
  },
  general_advice: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

const ShortMessage = sequelize.define("ShortMessage", {
  role: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.TEXT,
  },
});

Chat.hasOne(Message);
Message.belongsTo(Chat);
ShortMessage.belongsTo(Chat);
Chat.hasMany(ShortMessage);

module.exports = { Chat, Message, ShortMessage };
