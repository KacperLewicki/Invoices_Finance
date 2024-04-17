const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/invoice_items", (req, res) => {
    const { invoiceId, items } = req.body;
    if (!items || !Array.isArray(items)) {
        return res.status(400).send({ message: 'Brak poprawnej tablicy items.' });
    }

    const queries = items.map(item => {
        const query = 'INSERT INTO invoiceitem (nameInvoice, nameItem, quantity, vatItem, nettoItem, bruttoItem, comment) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [invoiceId, item.nameItem, item.quantity, item.vatItem, item.nettoItem, item.bruttoItem, item.comment];
        return pool.query(query, values);
    });

    Promise.all(queries)
        .then(() => res.send({ message: 'Wszystkie pozycje zostały dodane do faktury.' }))
        .catch(error => res.status(500).send({ message: 'Wystąpił błąd podczas dodawania pozycji do faktury.', error }));
});

module.exports = router;
