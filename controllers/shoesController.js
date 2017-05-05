var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('./dbconfig');
var cheerio = require('cheerio');
var logger = require('winston');
logger.level = 'debug';

exports.getList = function (req, res) {


    db.pool.getConnection(function(err,connection){
        var query = connection.query('SELECT * from proverb order by id desc', function (err, rows) {
            if(err){
                connection.release();
                throw err;
            }


            var user_id = req.query.user_id;
            res.render('proverb/list', {persons: rows, user_id: user_id});

            connection.release();
        });
        console.log(query);
    });


};