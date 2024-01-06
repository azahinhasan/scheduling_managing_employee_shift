const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.Server(app);

// Config
const config = require("./config/config");

// Import Routes

const usersRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const supervisorEmployeeRoutes = require("./routes/supervisor_employee_relations.routes");
const roleRoutes = require("./routes/role.routes");
const shiftRoutes = require("./routes/shift.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Mount routes
app.use("/api/user", usersRoutes);
app.use("/api/supervisor-employee-relations", supervisorEmployeeRoutes);
app.use("/auth", authRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/shift", shiftRoutes);

// connect to the database
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// Home
// Home
app.get("/", function (req, res) {
  res
    .status(200)
    .json({ success: true, messages: "Welcome to API home page!" });
});

// Listen to the PORT
app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`);
});

module.exports = { app, server, mongoose };


