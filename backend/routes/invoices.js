const express = require('express');
const router = express.Router();
const databaseConnection = require('../Middleware/databaseConnection.js');
const pool = require('../Config/db.js')

router.get('/all-invoices', databaseConnection, (req, res) => {

    const query = `
        SELECT invoicemanual.*, invoiceitem.id AS itemId, invoiceitem.nameItem, invoiceitem.comment, invoiceitem.vatItem, 
        invoiceitem.quantity, invoiceitem.nettoItem, invoiceitem.bruttoItem
        FROM invoicemanual
        LEFT JOIN invoiceitem ON invoiceitem.nameInvoice = invoicemanual.id
    `;

    req.connection.query(query, (error, results) => {
        req.connection.release();
        if (error) {
            return res.status(500).send({ message: "Error fetching invoices and items", error });
        }

        const invoicesWithItems = results.reduce((acc, curr) => {
            const index = acc.findIndex(item => item.id === curr.id);
            if (index > -1) {
                acc[index].items.push({ id: curr.itemId, nameItem: curr.nameItem, comment: curr.comment, 
                    vatItem: curr.vatItem, quantity: curr.quantity, nettoItem: curr.nettoItem, bruttoItem: curr.bruttoItem});
            } else {
                acc.push({...curr, items: curr.itemId ? [{ id: curr.itemId, nameItem: curr.nameItem,  comment: curr.comment, 
                    vatItem: curr.vatItem, quantity: curr.quantity, nettoItem: curr.nettoItem, bruttoItem: curr.bruttoItem}] : []});
            }
            return acc;
        }, []);

        res.json(invoicesWithItems);
    });
});

router.get('/invoicemanual', (req, res) => {
    pool.query('SELECT * FROM invoices', (error, results) => {
        if (error) {
            return res.status(500).send({
                message: "Error fetching invoices",
                error: error
            });
        }
        res.json(results);
    });
});

router.post("/invoice_manualforms", (req, res) => {
    const { nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName } = req.body;

    const query = `INSERT INTO invoicemanual (nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [nameInvoice, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, description, summaryNetto, summaryVat, summaryBrutto, ExchangeRate, paymentMethod, EfectiveMonth, documentStatus, currency, status, customerName];

    pool.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).send({message: "Błąd podczas zapisu do bazy danych", error});
        }
        res.status(201).send({message: "Faktura została pomyślnie utworzona", invoiceId: results.insertId});
    });
});

module.exports = router;
