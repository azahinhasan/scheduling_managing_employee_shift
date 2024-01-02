const userCtrl = require("../controllers/user.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router.route("/getAllUser").get(authCheck.haveAccess, userCtrl.getAllUser);
router.route("/createUser").post(authCheck.haveAccess, userCtrl.createUser);
router.route("/updateUser/:userId").put(authCheck.haveAccess, userCtrl.updateUser);
router.route("/changeUserRole/:userId").get(authCheck.haveAccess, userCtrl.changeUserRole);
router.route("/getUserByID/:userId").get(authCheck.haveAccess, userCtrl.getUserByID);
router.route("/deleteUser/:userId").delete(authCheck.haveAccess, userCtrl.deleteUser);
module.exports = router;
