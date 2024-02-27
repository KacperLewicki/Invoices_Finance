const express = require("express");
const mysql = require ("mysql");
const cors =  require ("cors");

const app = express();
app.use(cors());
app.use(express.json());

const data = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "invoice_manualforms",
});

data.connect(error => {
    if(error) throw error;
    console.log("połączono z bazą danych");
});

app.get("/invoice_manualformsInvoiceNumber", (req,res) => {

    const valueInvoiceNumber = `SELECT nameInvoice FROM invoicemanual ORDER BY nameInvoice DESC LIMIT 1`;

    data.query(valueInvoiceNumber, (error, results, fields) => {
        if(error){
            res.status(500).send(error.message);
                
            return;
        }

        const lastInvoiceName = results[0].nameInvoice;
        res.send(lastInvoiceName)

    })

})

app.post("/invoice_items", (req, res) => {

    console.log(req.body.invoiceId);
    console.log(req.body.items);

    const { invoiceId, items } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).send({ message: 'Brak poprawnej tablicy items.' });
    }

    const queries = items.map(item => {
        const query = 'INSERT INTO invoiceitem (nameInvoice, nameItem, quantity, vatItem, nettoItem, bruttoItem, comment) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [invoiceId, item.nameItem, item.quantity, item.vatItem, item.nettoItem, item.bruttoItem, item.comment];

        return new Promise((resolve, reject) => {
            data.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });

    Promise.all(queries)
        .then(results => {
            res.send({ message: 'Wszystkie pozycje zostały dodane do faktury.', results });
        })
        .catch(error => {
            res.status(500).send({ message: 'Wystąpił błąd podczas dodawania pozycji do faktury.', error });
        });
});

app.post("/invoice_manualforms", (req, res) => {
    
const { 
        
    nameInvoice,
    dataInvoice, 
    dataInvoiceSell, 
    DueDate,
    PaymentTerm,
    comments,
    seller,
    description,
    summaryNetto,
    summaryVat,
    summaryBrutto,
    ExchangeRate,
    paymentMethod,
    EfectiveMonth,
    documentStatus,
    currency, 
    status, 
    customerName 

    } = req.body;

const query =

`INSERT INTO invoicemanual (
    nameInvoice,
    dataInvoice, 
    dataInvoiceSell, 
    DueDate,
    PaymentTerm,
    comments,
    seller,
    description,
    summaryNetto,
    summaryVat,
    summaryBrutto,
    ExchangeRate,
    paymentMethod,
    EfectiveMonth,
    documentStatus,
    currency, 
    status, 
    customerName 
)

VALUE (?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [
    nameInvoice,
    dataInvoice, 
    dataInvoiceSell, 
    DueDate,
    PaymentTerm,
    comments,
    seller,
    description,
    summaryNetto,
    summaryVat,
    summaryBrutto,
    ExchangeRate,
    paymentMethod,
    EfectiveMonth,
    documentStatus,
    currency, 
    status, 
    customerName 
];

data.query(query, values, (error, results) => {
    if(error) {
        res.status(500).send({message: 
            "Bład podczas zapisu, do bazy danych", error});
    } else {
        res.status(201).send({message: 
            "Faktura została pomyślnie utworzona", invoiceId: results.insertId});
    }
});
});

app.listen(6969, ()=> {
    console.log("nasłuchuje, ziom cisza!")
});



