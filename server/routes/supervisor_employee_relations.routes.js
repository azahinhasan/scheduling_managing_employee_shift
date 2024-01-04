const supervisorEmployeeRelationCtrl = require("../controllers/supervisor_employee_relations.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router
  .route("/all_assigned_employee")
  .get(authCheck.haveAccess,supervisorEmployeeRelationCtrl.getEmployeeBySupervisorID);

router
  .route("/tag_employee_to_supervisor")
  .put(authCheck.haveAccess,supervisorEmployeeRelationCtrl.tagEmployeeToSupervisor);

module.exports = router;
