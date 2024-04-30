const express = require('express');
const router = express.Router();
const pool = require("../config/db");

router.get('/allCreditNoteDetails', (req, res) => {
    const sqlQuery = `
    SELECT 
        b.*, a.itemName, a.quantity
    FROM creditnotesinvoices b
    LEFT JOIN creditnoteitems a ON b.id = a.creditNoteId
    ORDER BY b.invoiceName ASC;
    `;
    pool.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('SQL Error:', error);
            res.status(500).send('Error fetching credit note details: ' + error);
            return;
        }
        
        const groupedResults = results.reduce((acc, curr) => {
            const invoiceIndex = acc.findIndex(inv => inv.id === curr.id);
            if (invoiceIndex > -1) {
                acc[invoiceIndex].items.push({
                    itemName: curr.itemName,
                    quantity: curr.quantity,
                });
            } else {
                acc.push({
                    id: curr.id,
                    CreditNote: curr.CreditNote,
                    invoiceName: curr.invoiceName,
                    customerName: curr.customerName,
                    datalnvoice: curr.datalnvoice,
                    items: curr.itemName ? [{
                        itemName: curr.itemName,
                        quantity: curr.quantity,
                    }] : []
                });
            }
            return acc;
        }, []);

        res.json(groupedResults);
    });
});

module.exports = router;
