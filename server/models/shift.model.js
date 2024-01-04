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
  // end_date: {
  //   type: Date,
  //   required: [true, "Please End Date"],
  // },
  start_time: {
    type: String, //24h format time
    required: [true, "Please Start Time"],
  },
  end_time: {
    type: String, //24h format time
    required: [true, "Please End Time"],
  },
  assigned_employee: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Please assign Employee"],
    },
  ],
});

module.exports = mongoose.model("shifts", ShiftSchema);
