var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var dbconfig = require('./database.js');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodetest'
});

/**
 * max값으 가지고 온다
 * @param callback
 */
function getMaxValue(callback) {

    var query = 'select (max(id)+1) as id from Persons';

    connection.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else
            callback(null, result[0].id);

    });

}


router.get('/get', function (req, res, next) {

    connection.query('SELECT * from Persons', function (err, rows) {
        if (err) throw err;

        console.log('The solution is: ', rows);
        /* res.send(rows);*/

        res.render('mysql', {rows: rows});

    });
});

router.get('/insert', function (req, res, next) {

    getMaxValue(function (err, maxId) {

        connection.query("INSERT INTO Persons (id, name, age) VALUES (" + maxId + " , 'kyungsuk', 38);", function (err, rows) {
            if (err) {
                throw err;
            } else {

                res.render('mysql_insert', {result: "success"});
            }

        });//connection End


    });


});


router.get('/', function (req, res, next) {

    res.render('person/inserForm', {title: "인서트폼"});


});


module.exports = router;
