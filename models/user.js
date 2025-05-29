const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define(
  "User",
  {
    UserId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
