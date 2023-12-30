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

app.post("/invoice_manualforms", (req, res) => {
    
const { 
        
    nameInvoice, 
    dataInvoice, 
    amountInvoice, 
    currency, 
    status, 
    customerName 

    } = req.body;


const query =

`INSERT INTO invoicemanual (
    nameInvoice, 
    dataInvoice, 
    amountInvoice, 
    currency, 
    status, 
    customerName
)

VALUE (?, ?, ?, ?, ?, ?)`;

const values = [
    nameInvoice, 
    dataInvoice, 
    amountInvoice, 
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



