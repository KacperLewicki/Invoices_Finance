import React, { useEffect, useState } from "react";
import axios from 'axios';
import InvoiceListCreditNote from "../CreditNoteInvoice/creditNoteInvoice";

export const CreditNoteList = () => {

    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', options);
    };

    useEffect(() => {
        axios.get('http://localhost:6969/allCreditNoteDetails')
            .then(response => setInvoices(response.data))
            .catch(error => console.error('Error fetching credit note details:', error));
    }, []);

    const openInvoice = (invoice) => {
        setSelectedInvoice(invoice); 
    };

    const closeInvoice = () => {
        setSelectedInvoice(null);
    };

    return (
        <>
        <h1 className='ListInvoiceH1'> Invoices </h1>

        <div className="invoice_ul">
            {invoices.map(invoice => (
                <div className='Invoice_fv' key={invoice.id}  onClick={() => openInvoice(invoice)}>
                    <h2 className='Invoice_title'>Faktura {invoice.CreditNote}</h2>
                    <p className='Invoice_data'>Customer Name: {invoice.customerName}</p>
                    <p className='Invoice_data'>Date Invoice: {formatDate(invoice.dataInvoice)}</p>
                    <p className='Invoice_data'>Status: {invoice.status}</p>
                    <p className='Invoice_data'>Seller: {invoice.seller}</p>
                    <p className='Invoice_data'>Date Invoice Sell: {formatDate(invoice.dataInvoiceSell)}</p>
                  
                </div>
              
            ))}
        </div>
            {selectedInvoice && <InvoiceListCreditNote invoice={selectedInvoice} onClose={closeInvoice} />}
     
        </>
    );
};
