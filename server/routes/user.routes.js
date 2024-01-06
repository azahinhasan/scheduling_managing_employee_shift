const userCtrl = require("../controllers/user.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router.route("/get_all").get(authCheck.haveAccess, userCtrl.getAllUser);
router.route("/create").post(authCheck.haveAccess, userCtrl.createUser);
router.route("/update/:user_id").put(authCheck.haveAccess, userCtrl.updateUser);
router
  .route("/change_role/:user_id")
  .post(authCheck.haveAccess, userCtrl.changeUserRole);
router.route("/get_by_id").get(authCheck.haveAccess, userCtrl.getUserByID);
router
  .route("/delete/:user_id")
  .delete(authCheck.haveAccess, userCtrl.deleteUser);
module.exports = router;


