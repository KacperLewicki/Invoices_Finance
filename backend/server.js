const express = require('express');
const cors = require('cors');
const invoiceNumbersRouter = require('./routes/invoiceNumbers');
const invoiceItemsRouter = require('./routes/invoiceItems');
const invoicesRouter = require('./routes/invoices');
const { getLastCreditNoteNumber, saveCreditNoteAndItems } = require('./routes/creditNoteController');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', invoiceNumbersRouter);
app.use('/', invoiceItemsRouter);
app.use('/', invoicesRouter);

app.get('/api/get-last-credit-note', async (req, res) => {
    try {
      console.log('Fetching the last credit note number...');
      const lastCreditNoteNumber = await getLastCreditNoteNumber();
      console.log('Last credit note number:', lastCreditNoteNumber);
      res.json({ lastCreditNote: lastCreditNoteNumber });
    } catch (error) {
      console.error('Error fetching the last credit note number:', error);
      res.status(500).json({ message: error.message });
    }
  });
  

  
  app.post('/api/save-credit-note', (req, res) => {
    getLastCreditNoteNumber().then(lastCreditNoteNumber => {
      const lastNumber = lastCreditNoteNumber ? parseInt(lastCreditNoteNumber.split('/')[1], 10) : 0;
      const newNumber = lastNumber + 1;
      const yearPart = new Date().getFullYear().toString().slice(-2);
      const newCreditNoteNumber = `CN/${String(newNumber).padStart(4, '0')}/${yearPart}`;
  
      saveCreditNoteAndItems({ ...req.body, CreditNote: newCreditNoteNumber }, req.body.items)
        .then(creditNoteId => {
          res.status(201).json({ message: 'Credit Note saved successfully', creditNoteId });
        })
        .catch(error => {
          console.error('Error saving credit note and items:', error);
          res.status(500).json({ message: 'Failed to save Credit Note.' });
        });
    }).catch(error => {
      console.error('Error getting the last credit note number:', error);
      res.status(500).json({ message: 'Failed to generate new Credit Note number.' });
    });
  });
  

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porcie ${PORT}`);
});
