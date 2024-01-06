const shiftCtrl = require("../controllers/shift.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router.route("/get-all").get(authCheck.haveAccess, shiftCtrl.getAllShift);
router.route("/create").post(authCheck.haveAccess, shiftCtrl.createShift);
router.route("/update/:shift_id").put(authCheck.haveAccess, shiftCtrl.updateShift);
router
  .route("/modify-employees-shift")
  .post(authCheck.haveAccess, shiftCtrl.modifyShiftOfEmployee);
router
  .route("/get-by-id/:shift_id")
  .get(authCheck.haveAccess, shiftCtrl.getShiftByID);
router
  .route("/delete/:shift_id")
  .delete(authCheck.haveAccess, shiftCtrl.deleteShift);
module.exports = router;
