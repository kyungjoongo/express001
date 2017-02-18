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
/**
 * ###############################################
 * #
 * #  personController
 * #
 * ###############################################
 */

/**
 * max value fetch person table
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


exports.getPersonList = function (req, res) {
    connection.query('SELECT * from Persons', function (err, rows) {
        if (err) throw err;

        console.log('The solution is: ', rows);
        /!* res.send(rows);*!/

        res.render('person/list', {persons: rows});
    });
};


exports.insertForm = function (req, res) {
    res.render('person/insertForm', {title: "인서트폼"});
};


exports.getOne = function (req, res) {

    var id = req.body.id;

    connection.query('SELECT * from Persons where id= ?', [id], function (err, rows) {
        if (err)
            throw err;


        //json repsonse
        res.json({person: rows[0]});

    });
};

exports.updatePerson = function (req, res) {

    var name = req.body.name;
    var content = req.body.contents;
    var id = req.body.id;

    console.log("id-->" + id);

    connection.query('update Persons set name = ? , contents= ? where id=?', [name, content, id], function (err, rows) {
        if (err)
            throw err;

        console.log('The solution is: ', rows);
        /!* res.send(rows);*!/

        res.redirect('list')
    });
};

exports.deletePerson = function (req, res) {
    var id = req.query.id;

    console.log("id-->" + id);

    connection.query('delete  from Persons where id =?', [id], function (err, rows) {
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

        connection.query("INSERT INTO Persons (id, contents, name) VALUES (?, ?, ? )", [maxId, contents, name], function (err, rows) {

            if (err) {
                throw err;
            } else {

                res.redirect('list');
                //res.render('person/list', {result: "true"});
            }

        });//connection End
    });
};


