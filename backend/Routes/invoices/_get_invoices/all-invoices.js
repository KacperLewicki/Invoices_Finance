const express = require('express');
const router = express.Router();
const databaseConnection = require('../../../Middleware/databaseConnection');

router.get('/list', databaseConnection, (req, res) => {

    const query = `
        SELECT invoicemanual.*, invoiceitem.id AS itemId, invoiceitem.nameItem, invoiceitem.comment, invoiceitem.vatItem, 
        invoiceitem.quantity, invoiceitem.nettoItem, invoiceitem.bruttoItem
        FROM invoicemanual
        LEFT JOIN invoiceitem ON invoiceitem.nameInvoice = invoicemanual.id
    `;

    req.socket.query(query, (error, results) => {
        req.socket.release();
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

module.exports = router;

