const express = require('express');
const router = express.Router();
const databaseConnection = require('../../../Middleware/databaseConnection');

router.post("/invoice_manualforms",databaseConnection, (req, res) => {
    
    const { nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName } = req.body;

    const query = `INSERT INTO invoicemanual (nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName];

    req.socket.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).send({message: "Błąd podczas zapisu do bazy danych", error});
        }
        res.status(201).send({message: "Faktura została pomyślnie utworzona", invoiceId: results.insertId});
    });
});

module.exports = router;