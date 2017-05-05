var express = require('express');
var router = express.Router();
var shoesController = require('../controllers/shoesController');

router.route('/shoes/list').get(shoesController.getList);



module.exports = router;
