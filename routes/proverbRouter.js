
var express = require('express');
var router = express.Router();
var proverbController = require('../controllers/proverbController');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;



/**
 * ######################################
 * 라우터 (proverbController)
 * ######################################
 */
/*router.route('/proverb/list').get(proverbController.getList, require('connect-ensure-login').ensureLoggedIn());*/
function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/login/loginWrongAccess');
}


router.get('/proverb/list', ensureAuthenticated, proverbController.getList);


router.route('/proverb/getListToJson').get(proverbController.getListToJson);
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
