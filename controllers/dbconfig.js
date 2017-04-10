var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: 'kyungjoon.ipdisk.co.kr',
    user: 'root',
    password: '1114',
    port: 3306,
    database: 'nodetest'
});

exports.pool = mysql.createPool({

    host: 'kyungjoon.ipdisk.co.kr',
    user: 'root',
    password: '1114',
    port: 3306,
    database: 'nodetest',
    connectionLimit:20,
    waitForConnections:false
});




