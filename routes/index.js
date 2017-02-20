var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render("login/loginForm");
  //res.render('index', { title: 'Express', kyungjoon: "고경준 천재님이십니다" });
});

module.exports = router;
