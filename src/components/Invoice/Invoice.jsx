import React from 'react';
import "./Invoice.css";
export const Invoice = ({ invoice }) => {

return (   
    <li className='invoice_li'>
    <p className='invoice_p'>Name: {invoice.name}</p>
    <p className='invoice_p'>Date: {invoice.date}</p>
    <p className='invoice_p'>Amount: {invoice.amount}</p>
    <p className='invoice_p'>Currency: {invoice.currency}</p>
    <p className='invoice_p'>Status: {invoice.status}</p>
    <p className='invoice_p'>Customer name: {invoice.customer_name}</p>
    <p className='invoice_p'>Payment due date: {invoice.payment_due_date}</p>
   
    </li>
   
    )

}