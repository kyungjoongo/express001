var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
//var db = require('../controllers/dbconfig');
/**
 * ######################################
 * 라우터 (personRouter)
 * ######################################
 */



/**
 * passport.authenticate('local'
 */

/*passport.use('local',new Strategy(function (username, password, cb) {


 db.pool.getConnection(function (err, connection) {
 var query;
 query = connection.query('SELECT count(*) as cnt, username, password, id from user2 where username= ? and password= ?', [username, password], function (err, rows) {
 if (err) {
 connection.release();
 return cb(err);
 }
 //console.log(rows);

 console.log("slkfsldkf-->" + rows[0].cnt);

 connection.release();

 //인증 성공인 경우..........
 if (rows[0].cnt > 0) {
 return cb(null, rows[0]);
 } else {//인증 실패인 경우....
 return cb(null, false);
 }


 });

 });


 }));*/


passport.use('local', new Strategy(function (username, password, done) {
        if (username == 'kyungjoon' && password == '1114') {
            var user = {'username': 'kyungjoon', 'password': '1114'};

            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));


passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user);
});


passport.deserializeUser(function (user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});


router.route('/login/loginForm').get(loginController.loginForm);
router.route('/login/loginFail').get(loginController.loginFail);
router.route('/login/loginWrongAccess').get(loginController.loginWrongAccess);
router.route('/login/logout').get(loginController.logout);


router.post('/login/loginAction', passport.authenticate('local', {failureRedirect: '/login/loginFail', failureFlash: true}),
    function (req, res) {
        res.redirect('/proverb/list');
});

router.route('/login/naverLoginCallback').get(loginController.naverLoginCallback);


module.exports = router;
