const supervisorEmployeeRelationCtrl = require("../controllers/supervisor_employee_relations.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router
  .route("/getEmployeeBySupervisorID/:supervisor_id")
  .get(supervisorEmployeeRelationCtrl.getEmployeeBySupervisorID);

router
  .route("/tagEmployeeToSupervisor")
  .put(supervisorEmployeeRelationCtrl.tagEmployeeToSupervisor);

module.exports = router;
