const mongoose = require("mongoose");
const crypto = require("crypto");

const RoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: [true, "Please enter name "],
    enum: ["administrator", "supervisor", "employee"],
  },
  permissions: {
    type: Array,
    //select: false,
    default: function () {
      if (this.role_name === "administrator") {
        return [
          "role/get_all",
          "role/create",
          "user/get_all",
          "user/create",
          "user/update",
          "user/change_role",
          "user/get_by_id",
          "user/delete",
          "supervisor_employee_relations/all_assigned_employee",
          "supervisor_employee_relations/tag_employee_to_supervisor",
          "shift/get_all",
          "shift/create",
          "shift/update",
          "shift/modify_employees_shift",
          "shift/get_by_id",
          "shift/delete",
        ];
      } else if (this.role_name === "supervisor") {
        return [
          "user/update",
          "user/change_role",
          "user/get_by_id",
          "supervisor_employee_relations/all_assigned_employee",
        ];
      } else {
        return [
          "user/create",
          "user/update",
        ];
      }
    },
  },
  // users: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "users",
  // },
});

module.exports = mongoose.model("roles", RoleSchema);
