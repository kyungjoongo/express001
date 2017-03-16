var express = require('express');
var router = express.Router();
var proverbController = require('../controllers/personController');

/**
 * ######################################
 * 라우터 (personRouter)
 * ######################################
 */
router.route('/proverb/list').get(proverbController.getPersonList);
router.route('/person/insertForm').get(proverbController.insertForm);
router.route('/person/insert').post(proverbController.insert);
router.route('/person/').get(proverbController.insertForm);
router.route('/proverb/detailForm').get(proverbController.getOne);
router.route('/person/updatePerson').post(proverbController.updatePerson);
router.route('/person/deletePerson').get(proverbController.deletePerson);

router.route('/person/ccc').get(proverbController.crawler);



module.exports = router;
