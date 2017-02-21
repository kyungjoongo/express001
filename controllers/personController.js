var express = require('express');
var router = express.Router();

var request = require('request');
var db = require('./dbconfig');



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


exports.getPersonList = function (req, res) {
    db.connection.query('SELECT * from Persons', function (err, rows) {
        if (err) throw err;

        logger.debug('고경준 천재님이십니다sdlfksdlfksldkf');
        logger.debug('고경준 천재님이십니다sdlfksdlfksldkf');
        logger.debug('고경준 천재님이십니다sdlfksdlfksldkf');
        logger.debug('고경준 천재님이십니다sdlfksdlfksldkf');
        logger.debug('고경준 천재님이십니다sdlfksdlfksldkf');







        var user_id = req.query.user_id;

        res.render('person/list', {persons: rows, user_id: user_id});
    });
};


exports.insertForm = function (req, res) {
    res.render('person/insertForm', {title: "인서트폼"});
};


exports.getOne = function (req, res) {

    var id = req.query.id;

    db.connection.query('SELECT * from Persons where id= ?', [id], function (err, rows) {
        if (err)
            throw err;


        /*//json repsonse
        res.json({person: rows[0]});*/

        res.render('person/detailForm', {person: rows[0]});

    });
};

exports.updatePerson = function (req, res) {

    var name = req.body.name;
    var content = req.body.contents;
    var id = req.body.id;

    console.log("id-->" + id);

    db.connection.query('update Persons set name = ? , contents= ? where id=?', [name, content, id], function (err, rows) {
        if (err)
            throw err;

        res.redirect('list')
    });
};

exports.deletePerson = function (req, res) {
    var id = req.query.id;

    console.log("id-->" + id);

    db.connection.query('delete  from Persons where id =?', [id], function (err, rows) {
        if (err)
            throw err;
        else
            console.log("삭제성공");

        res.redirect('list')
    });
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
                //res.render('person/list', {result: "true"});
            }

        });//db.connection End
    });
};



