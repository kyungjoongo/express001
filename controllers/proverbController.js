var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('./dbconfig');
var cheerio = require('cheerio');
var logger = require('winston');
logger.level = 'debug';


/**
 * ###############################################
 * #
 * #  board Controller
 * #
 * ###############################################
 */

/**
 * max value fetch person table
 * @param callback
 */
function getMaxValue(callback) {
    var query = 'select (max(id)+1) as id from Persons';

    db.connection.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else
            callback(null, result[0].id);

    });

}


/**
 * 퍼슨리스트 fetch 컨트롤러
 * @param req
 * @param res
 */
exports.getList = function (req, res) {
    db.connection.query('SELECT * from proverb order by id desc', function (err, rows) {
        if (err)
            throw err;

        var user_id = req.query.user_id;

        res.render('proverb/list', {persons: rows, user_id: user_id});

    });
};

exports.getListToJson = function (req, res) {
    db.connection.query('SELECT * from proverb order by id desc', function (err, rows) {
        if (err)
            throw err;

        var user_id = req.query.user_id;

//        res.render('proverb/list', {persons: rows, user_id: user_id});

        res.json({proverb:rows});
    });
};



exports.insertForm = function (req, res) {
    res.render('proverb/insertForm', {title: "인서트폼"});
};


exports.getOne = function (req, res) {

    var id = req.query.id;

    db.connection.query('SELECT * from proverb where id= ?', [id], function (err, rows) {
        if (err)
            throw err;


        /*//json repsonse
         res.json({person: rows[0]});*/

        res.render('proverb/detailForm', {proverb: rows[0]});

    });
};

exports.updatePerson = function (req, res) {

    var name = req.body.name;
    var content = req.body.contents;
    var id = req.body.id;

    console.log("id-->" + id);

    db.connection.query('update Proverb set author = ? , contents= ? where id=?', [name, content, id], function (err, rows) {
        if (err)
            throw err;

        res.redirect('list')
    });
};

exports.deletePerson = function (req, res) {
    var id = req.query.id;

    console.log("id-->" + id);

    db.connection.query('delete  from Proverb where id =?', [id], function (err, rows) {
        if (err)
            throw err;
        else
            console.log("삭제성공");

        res.redirect('list')
    });
};

exports.crawler = function (req, res) {


    var url = "http://www.sherdog.com/events/UFC-209-Woodley-vs-Thompson-2-56255";


    //웹 크로울링.........
    request(url, function (error, res, body) {
        if (error) throw error;

        var $ = cheerio.load(body);

        //console.log(body);
        /*<span itemprop="name">Khabib Nurmagomedov</span>*/
        var postElements = $("span[itemprop=name]");
        postElements.each(function () {


            /*<span itemprop="name">Tyron Woodley</span>*/
            var postTitle = $(this).text();
            /*var postUrl = $(this).find("h1 a").attr("href");*/

            console.log(postTitle);
           /* console.log(postUrl);*/
        });


    });

    res.redirect('list');
};


exports.insert = function (req, res) {

    getMaxValue(function (err, maxId) {
        var name = req.body.name;
        var contents = req.body.contents;

        db.connection.query("INSERT INTO Persons (id, contents, name) VALUES (?, ?, ? )", [maxId, contents, name], function (err, rows) {

            if (err) {
                throw err;
            } else {

                res.redirect('list');
                //res.render('proverb/list', {result: "true"});
            }

        });//db.connection End
    });
};



