var express = require('express');
var router = express.Router();
var proverbController = require('../controllers/proverbController');

/**
 * ######################################
 * 라우터 (proverbController)
 * ######################################
 */
router.route('/proverb/list').get(proverbController.getList);

router.route('/proverb/listToJson').get(proverbController.getListToJson);
router.route('/proverb/insertForm').get(proverbController.insertForm);
router.route('/proverb/insert').post(proverbController.insert);
router.route('/proverb/').get(proverbController.insertForm);
router.route('/proverb/detailForm').get(proverbController.getOne);
router.route('/proverb/getOneToJson').get(proverbController.getOneToJson);
router.route('/proverb/getOneToJsonEnglish').get(proverbController.getOneToJsonEnglish);
router.route('/proverb/update').post(proverbController.updatePerson);
router.route('/proverb/deletePerson').get(proverbController.deletePerson);
router.route('/proverb/ccc').get(proverbController.crawler);



module.exports = router;
