const pool = require('../Config/db');

const databaseConnection = (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({ message: "Error connecting to database", error: err });
        }
        req.socket = connection;
        next();
    });
};

module.exports = databaseConnection;


