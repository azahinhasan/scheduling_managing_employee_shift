require("dotenv").config();

const config = {
  ENV: process.env.ENV || "development",
  PORT: 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI||"mongodb+srv://admin:rk832YNjTWiv4l6I@cluster0.u3psp.mongodb.net/singularity_task?retryWrites=true&w=majority",
};

module.exports = config;
