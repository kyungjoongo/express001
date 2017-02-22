var express = require('express');
var router = express.Router();
var mobileController = require('../controllers/mobileController');

/**
 * ######################################
 * 라우터 (personRouter)
 * ######################################
 */


router.route('/mobile/').get(mobileController.index);



module.exports = router;
