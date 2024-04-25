import React from 'react';
import "./invoiceCreditNote.css";

const CreditNoteInvoice = ({ invoice, onClose}) => {
    return (
        <div className="MainScreenCreditNote">
            <p>Witaj w creditNote</p>
            <input placeholder={invoice.customerName} />
            <button onClick={onClose}>Zamknij</button>
        </div>
    );
}

export default CreditNoteInvoice;