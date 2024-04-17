const pool = require('../config/db');

function databaseConnection(req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({
                message: 'Database connection failed',
                error: err
            });
        }
        req.connection = connection;  
        next();
    });
}

module.exports = databaseConnection;


