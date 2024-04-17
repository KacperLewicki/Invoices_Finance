const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/invoice_manualformsInvoiceNumber', (req, res) => {
    const valueInvoiceNumber = `SELECT nameInvoice FROM invoicemanual ORDER BY nameInvoice DESC LIMIT 1`;
    pool.query(valueInvoiceNumber, (error, results, fields) => {
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        const lastInvoiceName = results[0].nameInvoice;
        res.send(lastInvoiceName);
    });
});

module.exports = router;
