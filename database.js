require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log(process.env.PSQL);

const sequelize = new Sequelize(process.env.PSQL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  logging: console.log,
  pool: {
    max: 5, // максимум 5 подключений
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => console.error("❌ Could not connect:", err));

module.exports = sequelize;
