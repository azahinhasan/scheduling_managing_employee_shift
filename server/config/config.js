require("dotenv").config();

const config = {
  ENV: process.env.ENV || "development",
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET||"fasdfasd",
  MONGO_URI: process.env.MONGO_URI||"mongodb+srv://admin:rk832YNjTWiv4l6I@cluster0.u3psp.mongodb.net/singularity_task?retryWrites=true&w=majority",
};

module.exports = config;