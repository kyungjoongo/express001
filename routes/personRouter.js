var express = require('express');
var router = express.Router();
var personController = require('../controllers/personController');

/**
 * ######################################
 * 라우터 (personRouter)
 * ######################################
 */
router.route('/person/list').get(personController.getPersonList);
router.route('/person/insertForm').get(personController.insertForm);
router.route('/person/insert').post(personController.insert);
router.route('/person/').get(personController.insertForm);
router.route('/person/detailForm').get(personController.getOne);
router.route('/person/updatePerson').post(personController.updatePerson);
router.route('/person/deletePerson').get(personController.deletePerson);



module.exports = router;
