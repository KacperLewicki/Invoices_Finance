const pool = require('../Config/db');

function databaseConnection(req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({
                message: 'Database connection failed',
                error: err
            });
        }
        req.socket = connection;  
        next();
    });
}

module.exports = databaseConnection;


