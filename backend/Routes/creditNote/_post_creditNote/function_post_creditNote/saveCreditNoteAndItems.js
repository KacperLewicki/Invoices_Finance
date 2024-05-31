const pool = require("../../../../Config/db");

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

module.exports = { saveCreditNoteAndItems };