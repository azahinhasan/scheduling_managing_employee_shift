const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: [true, "Please Start Time"],
  },
  endTime: {
    type: Date,
    required: [true, "Please End Time"],
  },
  assignedEmployees: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "Please assign Employee"],
  },
});

module.exports = mongoose.model("shifts", ShiftSchema);
