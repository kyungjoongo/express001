var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodetest'
});
var logger = require('winston');
logger.level = 'debug';



/**
 * ###############################################
 * #
 * #  login 콘트롤러
 * #
 * ###############################################
 */


exports.loginForm = function (req, res) {

    res.render('login/loginForm');
};

exports.loginAction = function (req, res) {

    var access_token = req.query.access_token;
    var user_id = req.query.user_id;
    var user_email = req.query.user_email;

    //db에 유저정보 저장후에 / 유저 세션을 생성한다.
    console.log("access_token--->"+ access_token);
    console.log("user_id--->"+ user_id);
    console.log("user_email--->"+ user_email);

    logger.debug('Hello again 고경준 천재닙이십니elksdlfkldskflk logs');

    var user_id = encodeURIComponent(user_id);

    res.redirect('/person/list?user_id='+user_id );
};

//loginNaverCallback
exports.naverLoginCallback = function (req, res) {

    res.render('login/naverLoginCallback');

    //res.render('person/list', {persons: rows, user_id: user_id});
};





