const express = require('express');
const pool = require("../Config/db");
const databaseConnection = require('../Middleware/databaseConnection');
const router = express.Router();

const getLastCreditNoteNumber = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT CreditNote FROM creditnotesinvoices ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.length > 0 ? results[0].CreditNote : null);
      });
    });
  };

  const saveCreditNoteAndItems = (creditNoteData, items) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
  
        connection.beginTransaction(err => {
          if (err) {
            connection.release();
            return reject(err);
          }
  
          const {
            CreditNote, invoiceName, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller,  summaryNetto, summaryBrutto, summaryVat,
            customerName, description, ExchangeRate, paymentMethod, EffectiveMonth, documentStatus, status, currency
          } = creditNoteData;
          
          connection.query(
            'INSERT INTO creditnotesinvoices (CreditNote, invoiceName, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller,  summaryNetto, summaryBrutto, summaryVat, customerName, description, ExchangeRate, paymentMethod, EffectiveMonth, documentStatus, status, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [CreditNote, invoiceName, dataInvoice, dataInvoiceSell, DueDate, PaymentTerm, comments, seller, summaryNetto, summaryBrutto, summaryVat, customerName, description, ExchangeRate, paymentMethod, EffectiveMonth, documentStatus, status, currency],
            (error, creditNoteResult) => {
              if (error) {
                return connection.rollback(() => {
                  connection.release();
                  reject(error);
                });
              }
  
              const creditNoteId = creditNoteResult.insertId;
  
              const itemPromises = items.map(item => {
                return new Promise((itemResolve, itemReject) => {
                  const { nameItem, quantity, bruttoItem, nettoItem, vatItem } = item;
                  connection.query(
                    'INSERT INTO creditnoteitems (creditNoteId, itemName, quantity, bruttoItem, nettoItem, vatItem) VALUES (?, ?, ?, ?, ?, ?)',
                    [creditNoteId, nameItem, quantity, bruttoItem, nettoItem, vatItem],
                    (itemError) => {
                      if (itemError) {
                        return itemReject(itemError);
                      }
                      itemResolve();
                    }
                  );
                });
              });
  
              Promise.all(itemPromises)
                .then(() => {
                  connection.commit((commitErr) => {
                    if (commitErr) {
                      return connection.rollback(() => {
                        connection.release();
                        reject(commitErr);
                      });
                    }
                    connection.release();
                    resolve(creditNoteId);
                  });
                })
                .catch(error => {
                  connection.rollback(() => {
                    connection.release();
                    reject(error);
                  });
                });
            }
          );
        });
      });
    });
  };

router.post('/api/SaveCreditNote',databaseConnection, async (req, res) => {
  try {
    const lastCreditNoteNumber = await getLastCreditNoteNumber();
    const lastNumber = lastCreditNoteNumber ? parseInt(lastCreditNoteNumber.split('/')[1], 10) : 0;
    const newNumber = lastNumber + 1;
    const yearPart = new Date().getFullYear().toString().slice(-2);
    const newCreditNoteNumber = `CN/${String(newNumber).padStart(4, '0')}/${yearPart}`;

    const creditNoteId = await saveCreditNoteAndItems({ ...req.body, CreditNote: newCreditNoteNumber }, req.body.items);
    res.status(201).json({ message: 'Credit Note saved successfully', creditNoteId, newCreditNoteNumber });
  } catch (error) {
    console.error('Error in processing the Credit Note:', error);
    res.status(500).json({ message: error.message || 'Failed to process the Credit Note.' });
  }
});

module.exports = router;