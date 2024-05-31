const pool = require("../../../../Config/db");

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


  module.exports = { getLastCreditNoteNumber };