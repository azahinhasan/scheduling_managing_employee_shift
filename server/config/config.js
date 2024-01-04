require("dotenv").config();

const config = {
  ENV: process.env.ENV || "development",
  PORT: 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI
};

module.exports = config;
