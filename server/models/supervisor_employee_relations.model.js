const mongoose = require("mongoose");

const SupervisorEmployeeSchema = new mongoose.Schema({
  supervisor_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  assigned_employees_id: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = mongoose.model(
  "supervisor_employee_relations",
  SupervisorEmployeeSchema
);
