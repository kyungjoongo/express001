var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('./dbconfig');
//var cheerio = require('cheerio');
//var logger = require('winston');
//logger.level = 'debug';
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

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

exports.loginFail = function (req, res) {

    res.render('login/loginForm', {msg: "로긴실패"});
};

exports.loginWrongAccess = function (req, res) {

    res.render('login/loginForm', {msg: "잘못된접근입니다"});
};

exports.logout = function (req, res) {

    req.session.destroy(function (err) {
        res.render('login/loginForm', {msg: "로그아웃"});
    });
};


/**
 *
 * @param req
 * @param res
 */
exports.loginAction = function (req, res) {


    console.log("user->"+ req.user);


    res.render('proverb/list', {user: req.user});
};


//loginNaverCallback
exports.naverLoginCallback = function (req, res) {

    res.render('login/naverLoginCallback');

    //res.render('person/list', {persons: rows, user_id: user_id});
};





