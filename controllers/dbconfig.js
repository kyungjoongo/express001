var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1114',
    port: 3306,
    database: 'nodetest'
});


