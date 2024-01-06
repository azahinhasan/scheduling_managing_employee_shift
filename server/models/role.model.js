const mongoose = require("mongoose");
const crypto = require("crypto");

const RoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: [true, "Please enter name "],
    unique: true,
    enum: ["administrator", "supervisor", "employee"],
  },
  permissions: {
    type: Array,
    //select: false,
    default: function () {
      if (this.role_name === "administrator") {
        return [
          "role/get-all",
          "role/create",
          "supervisor-employee-relations/untag-employee-from-supervisor",
          "user/get-all",
          "user/get-all-in-table",
          "user/create",
          "user/update",
          "user/change-role",
          "user/get-by-id",
          "user/delete",
          "supervisor-employee-relations/all-assigned-employee",
          "supervisor-employee-relations/tag-employee-to-supervisor",
          "shift/get-all",
          "shift/create",
          "shift/update",
          "shift/modify-employees-shift",
          "shift/get-by-id",
          "shift/delete",
        ];
      } else if (this.role_name === "supervisor") {
        return [
          "user/update",
          "user/get-all",
          "user/get-by-id",
          "supervisor-employee-relations/all-assigned-employee",
          "shift/modify-employees-shift",
          "role/get-all",
          "shift/get-all",
        ];
      } else {
        return [
          "user/create",
          "user/update",
          "user/get-by-id",
          "role/get-all",
          "shift/get-all",
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
