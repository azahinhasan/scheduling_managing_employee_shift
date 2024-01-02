const mongoose = require("mongoose");
const crypto = require("crypto");

const RoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: [true, "Please enter name "],
    enum: ["administrator", "supervisor", "employee"],
  },
  permissions:[],
  // users: {
  //   type: mongoose.Schema.ObjectId, 
  //   ref: "users",
  // },
});

RoleSchema.methods.setPermissions = function() {
  if (this.role_name) {
    console.log("this.permissions")
    this.permissions=[""];
  }
};
 
module.exports = mongoose.model("roles", RoleSchema);
