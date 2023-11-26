import React, { useState, useEffect } from 'react';
import { InvoicesApi } from '../../api/Invoices'; 
import { Invoice } from '../Invoice/Invoice'; 

const InvoicesList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const invoicesData = await InvoicesApi.getAll();
            setInvoices(invoicesData);
        };

        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>Lista Faktur</h1>
            <ul>
                {invoices.map(invoice => (
                    <Invoice key={invoice.id} invoice={invoice} />
                ))}
            </ul>
        </div>
    );
};

export default InvoicesList;
