const express = require('express');
const cors = require('cors');
const invoiceNumbersRouter = require('./routes/invoiceNumbers');
const invoiceItemsRouter = require('./routes/invoiceItems');
const invoicesRouter = require('./routes/invoices');
const creditNoteRouter = require('./routes/creditNote');
const getcreditNote = require('./routes/getCreditNote');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', invoiceNumbersRouter);
app.use('/', invoiceItemsRouter);
app.use('/', invoicesRouter);
app.use('/',creditNoteRouter);
app.use('/', getcreditNote);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porcie ${PORT}`);
});
