const authCtrl = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();


router.route('/sign_in')
    .post(authCtrl.signIn)
    
router.route('/sign_out')
    .get(authCtrl.signOut)

module.exports = router;