const express = require('express');
const router = express.Router();
const databaseConnection = require("../../../Middleware/databaseConnection")

router.get('/listCreditNote', databaseConnection, (req, res) => {
  const sqlQuery = `
  SELECT
    a.id,
    a.CreditNote,
    a.invoiceName,
    a.dataInvoice,
    a.dataInvoiceSell,
    a.DueDate,
    a.PaymentTerm,
    a.comments,
    a.seller,
    a.summaryNetto,
    a.summaryBrutto,
    a.summaryVat,
    a.customerName,
    a.description,
    a.ExchangeRate,
    a.paymentMethod,
    a.EffectiveMonth,
    a.documentStatus,
    a.status,
    a.currency,
    b.creditNoteId,
    b.itemName,
    b.quantity,
    b.bruttoItem,
    b.nettoItem,
    b.vatItem
  FROM creditnotesinvoices a
  LEFT JOIN creditnoteitems b ON a.id = b.creditNoteId
  ORDER BY a.invoiceName ASC;
  `;

  req.socket.query(sqlQuery, (error, results, fields) => {
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
          bruttoItem: curr.bruttoItem,
          nettoItem: curr.nettoItem,
          vatItem: curr.vatItem
        });
      } else {
        acc.push({
          id: curr.id,
          CreditNote: curr.CreditNote,
          invoiceName: curr.invoiceName,
          dataInvoice: curr.dataInvoice,
          dataInvoiceSell: curr.dataInvoiceSell,
          DueDate: curr.DueDate,
          PaymentTerm: curr.PaymentTerm,
          comments: curr.comments,
          seller: curr.seller,
          summaryBrutto: curr.summaryBrutto,
          summaryNetto: curr.summaryNetto,
          summaryVat: curr.summaryVat,
          customerName: curr.customerName,
          description: curr.description,
          ExchangeRate: curr.ExchangeRate,
          paymentMethod: curr.paymentMethod,
          EffectiveMonth: curr.EffectiveMonth,
          documentStatus: curr.documentStatus,
          status: curr.status,
          currency: curr.currency,
          items: curr.itemName ? [{
            itemName: curr.itemName,
            quantity: curr.quantity,
            bruttoItem: curr.bruttoItem,
            nettoItem: curr.nettoItem,
            vatItem: curr.vatItem
          }] : []
        });
      }
      return acc;
    }, []);

    res.json(groupedResults);
  });
});

module.exports = router;
