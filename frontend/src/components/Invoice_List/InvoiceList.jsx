import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./InvoiceList.css";
import Invoice from '../Invoice/Invoice';

const InvoiceList = () => {

    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', options);
    };

    useEffect(() => {
        axios.get('http://localhost:6969/all-invoices')
            .then(response => setInvoices(response.data))
            .catch(error => console.error('Error fetching invoices:', error));
    }, []);

    const openInvoice = (invoice) => {
        setSelectedInvoice(invoice); 
        document.body.classList.add('Invoice-open'); 
    };

    const closeInvoice = () => {
        setSelectedInvoice(null);
        document.body.classList.remove('Invoice-open'); 
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInvoices = invoices.filter(invoice => {
        return invoice.nameInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
               formatDate(invoice.dataInvoice).includes(searchTerm) ||
               formatDate(invoice.dataInvoiceSell).includes(searchTerm) ||
               invoice.seller.includes(searchTerm);
    });

    return (
        <>
        <h1 className='ListInvoiceH1'> Invoices </h1>

        <input
            type="text"
            placeholder="Search by name or date..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
        />

        <div className="invoice_ul">
            {filteredInvoices.map(invoice => (
                <div className='Invoice_fv' key={invoice.id}  onClick={() => openInvoice(invoice)}>
                    <h2 className='Invoice_title'>Faktura {invoice.nameInvoice}</h2>
                    <p className='Invoice_data'>Customer Name: {invoice.customerName}</p>
                    <p className='Invoice_data'>Date Invoice: {formatDate(invoice.dataInvoice)}</p>
                    <p className='Invoice_data'>Status: {invoice.status}</p>
                    <p className='Invoice_data'>Seller: {invoice.seller}</p>
                    <p className='Invoice_data'>Date Invoice Sell: {formatDate(invoice.dataInvoiceSell)}</p>
                  
                </div>
              
            ))}
        </div>

        {selectedInvoice && <Invoice invoice={selectedInvoice} onClose={closeInvoice} />}
        
        </>
    );
};

export default InvoiceList;
