const mysql = require('mysql');

const pool = mysql.createPool({

    connectionLimit: 1000,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invoice_manualforms',

});

module.exports = pool;


