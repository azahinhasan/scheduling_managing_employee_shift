const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
  label: {
    //shift name
    type: String,
  },
  label_color: {
    type: String,
    default:"white"
  },
  date: {
    type: Date,
    required: [true, "Please Start Date"],
  },
  start_time: {
    type: String, //12h format time
    required: [true, "Please Start Time"],
  },
  end_time: {
    type: String, //12h format time
    required: [true, "Please End Time"],
  },
  assigned_employee: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users"
    },
  ],
});

module.exports = mongoose.model("shifts", ShiftSchema);
