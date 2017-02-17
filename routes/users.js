var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    //res.send('respond with a resource');

    res.render('users', {title: 'userList', kyungjoon: "user1.user, user3"});

});

module.exports = router;
