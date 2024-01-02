const supervisorEmployeeRelationCtrl = require("../controllers/supervisor_employee_relations.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router
  .route("/all_assigned_employee/:supervisor_id")
  .get(supervisorEmployeeRelationCtrl.getEmployeeBySupervisorID);

router
  .route("/tag_employee_to_supervisor")
  .put(supervisorEmployeeRelationCtrl.tagEmployeeToSupervisor);

module.exports = router;
