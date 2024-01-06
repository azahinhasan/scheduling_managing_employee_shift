const supervisorEmployeeRelationCtrl = require("../controllers/supervisor_employee_relations.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router
  .route("/all-assigned-employee")
  .get(
    authCheck.haveAccess,
    supervisorEmployeeRelationCtrl.getEmployeeBySupervisorID
  );

router
  .route("/tag-employee-to-supervisor")
  .put(
    authCheck.haveAccess,
    supervisorEmployeeRelationCtrl.tagEmployeeToSupervisor
  );

router
  .route("/untag-employee-from-supervisor")
  .post(
    authCheck.haveAccess,
    supervisorEmployeeRelationCtrl.untagSupervisor
  );

module.exports = router;
