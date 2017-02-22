var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');

/**
 * ######################################
 * 라우터 (personRouter)
 * ######################################
 */
router.route('/login/loginForm').get(loginController.loginForm);
router.route('/login/loginAction').get(loginController.loginAction);
router.route('/login/naverLoginCallback').get(loginController.naverLoginCallback);





module.exports = router;
