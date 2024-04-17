const express = require('express');
const cors = require('cors');
const invoiceNumbersRouter = require('./routes/invoiceNumbers');
const invoiceItemsRouter = require('./routes/invoiceItems');
const invoicesRouter = require('./routes/invoices');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', invoiceNumbersRouter);
app.use('/', invoiceItemsRouter);
app.use('/', invoicesRouter);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porcie ${PORT}`);
});
