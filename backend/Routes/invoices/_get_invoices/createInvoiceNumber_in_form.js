const express = require('express');
const router = express.Router();
const databaseConnection = require('../../../Middleware/databaseConnection');

router.get('/invoiceNumber_in_form', databaseConnection, (req, res) => {
    const valueInvoiceNumber = `SELECT nameInvoice FROM invoicemanual ORDER BY nameInvoice DESC LIMIT 1`;
    req.socket.query(valueInvoiceNumber, (error, results, fields) => {
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        const lastInvoiceName = results[0].nameInvoice;
        res.send(lastInvoiceName);
    });
});

module.exports = router;
