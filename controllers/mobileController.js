var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('./dbconfig');
var cheerio = require('cheerio');
var logger = require('winston');
logger.level = 'debug';


exports.index = function (req, res) {
    res.render('mobile/index', {title: "인서트폼"});
};





