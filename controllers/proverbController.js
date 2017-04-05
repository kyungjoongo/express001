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
 * #  board Controller 방가방가워요sldkflsdkflsdklfksdlfk
 * #
 * #
 * ###############################################
 */

/**
 * max value fetch person table
 * @param callback  lkfldsklgkdfslgklsdfkglsdfkg
 * 
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
 * 
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

    db.pool.getConnection(function(err,connection){
        var query = connection.query('SELECT * from proverb order by id desc', function (err, rows) {
            if(err){
                connection.release();
                throw err;
            }

            res.json({proverb:rows});
            connection.release();
        });
        console.log(query);
    });

};



/**
 * slkflskdflksadlfklsdkflksdf
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
exports.getOneToJson = function (req, res) {

    var id = req.query.id;

    var minimum = 43;
    var maximum = 945;
        ;

    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;



    db.pool.getConnection(function(err,connection){
        var query = connection.query('SELECT * from proverb where id= ?', [randomnumber], function (err, rows) {
            if(err){
                connection.release();
                throw err;
            }
            console.log(rows);
            res.json({proverb: rows[0]});
            connection.release();
        });
        console.log(query);
    });

};


exports.getOneToJsonEnglish = function (req, res) {

    var id = req.query.id;

    var minimum = 43;
    var maximum = 673

        ;

    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;


    db.pool.getConnection(function(err,connection){
        var query = connection.query('SELECT * from english_proverb where id= ?', [randomnumber], function (err, rows) {
            if(err){
                connection.release();
                throw err;
            }
            console.log(rows);
            res.json({proverb: rows[0]});
            connection.release();
        });
        console.log(query);
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


    var url = "http://www.instagram.com/denis77777123/";


    //웹 크로울링.........
    request(url, function (error, res, body) {
        if (error) throw error;

        var $ = cheerio.load(body);


        var imgTag = $("img[alt='Change profile photo']").attr("src");

       /* var postTitle = imgTag.attr("src");*/
        console.log(imgTag);

      /*  var postElements = $("button._jzgri");
        postElements.each(function() {
            /!*var postTitle = $(this).find("h1").text();*!/
            var postUrl = $(this).find("img").attr("src");

            console.log(postUrl);
        });*/

       /* postElements.each(function () {


            /!*<span itemprop="name">Tyron Woodley</span>*!/
            var postTitle = $(this).attr("src");
            /!*var postUrl = $(this).find("h1 a").attr("href");*!/

            console.log(postTitle);
           /!* console.log(postUrl);*!/
        });*/


    });

    //res.redirect('list');
};




exports.insert = function (req, res) {

    getMaxValue(function (err, maxId) {
        var author = req.body.author;
        var contents = req.body.contents;

        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let imageFile = req.files.image;

        imageFile.mv('c:\\upload\\'+ imageFile.name, function(err) {
            if (err)
                return res.status(500).send(err);
        });

        var imageFileUrl = imageFile.name;


        db.connection.query("INSERT INTO Proverb ( contents, author, image_uri) VALUES (?, ?, ? )", [ contents, author, imageFileUrl], function (err, rows) {
            if (err) {
                throw err;
            } else {

                res.redirect('list');
                //res.render('proverb/list', {result: "true"});
            }

        });//db.connection End
    });
};



