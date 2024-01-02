const roleCtrl = require("../controllers/role.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router.route("/get_all").get(authCheck.haveAccess, roleCtrl.getAllRole);
router.route("/create").post(authCheck.haveAccess, roleCtrl.createRole);

module.exports = router;
