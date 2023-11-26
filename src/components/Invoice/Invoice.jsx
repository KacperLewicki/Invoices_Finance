import React from 'react';

export const Invoice = ({ invoice }) => {

return (
    <li>
    <p>Name: {invoice.name}</p>
    <p>Date: {invoice.date}</p>
    <p>Amount: {invoice.amount}</p>
    <p>Status: {invoice.status}</p>
    <p>Customer name: {invoice.customer_name}</p>
    <p>Payment due date: {invoice.payment_due_date}</p>
    <p>Currency: {invoice.currency}</p>
    </li>
    )

}