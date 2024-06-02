const express = require('express');
const cors = require('cors');
const invoiceNumber = require('./Routes/invoices/_get_invoices/createInvoiceNumber_in_form');
const invoiceItems = require('./Routes/invoices/_post_invoices/invoice_Items');
const createCreditNote = require('./Routes/creditNote/_post_creditNote/createCreditNote');
const all_creditNote = require('./Routes/creditNote/_get_creditNote/all-CreditNote');
const login = require('./Routes/user_registration_and_login/login');
const signup = require("./Routes/user_registration_and_login/signup");
const all_invoices = require("./Routes/invoices/_get_invoices/all-invoices");
const invoice_manualforms = require("./Routes/invoices/_post_invoices/invoice_manualforms");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/create', invoiceNumber);
app.use('/invoice', invoiceItems);
app.use('/invoices', all_invoices);
app.use('/create', invoice_manualforms);
app.use('/create', createCreditNote);
app.use('/creditNotes', all_creditNote);
app.use('/', login);
app.use('/', signup);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porcie ${PORT}`);
});
