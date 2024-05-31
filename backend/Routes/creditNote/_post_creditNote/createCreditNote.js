const express = require('express');
const { getLastCreditNoteNumber } = require("./function_post_creditNote/getLastCreditNoteNumber");
const { saveCreditNoteAndItems } = require("./function_post_creditNote/saveCreditNoteAndItems");
const databaseConnection = require('../../../Middleware/databaseConnection');
const router = express.Router();

router.post('/creditNote',databaseConnection, async (req, res) => {
  try {
    const lastCreditNoteNumber = await getLastCreditNoteNumber();

    const lastNumber = lastCreditNoteNumber ? parseInt(lastCreditNoteNumber.split('/')[1], 10) : 0;
    const newNumber = lastNumber + 1;
    const yearPart = new Date().getFullYear().toString().slice(-2);
    const newCreditNoteNumber = `CN/${String(newNumber).padStart(4, '0')}/${yearPart}`;

    const creditNoteId = saveCreditNoteAndItems({ ...req.body, CreditNote: newCreditNoteNumber }, req.body.items);
    res.status(201).json({ message: 'Credit Note saved successfully', creditNoteId, newCreditNoteNumber });
  } catch (error) {
    console.error('Error in processing the Credit Note:', error);
    res.status(500).json({ message: error.message || 'Failed to process the Credit Note.' });
  }
});

module.exports = router;