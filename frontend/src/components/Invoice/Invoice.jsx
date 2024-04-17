import React from 'react';
import "./Invoice.css"

const Invoice = ({ invoice, onClose }) => {

return (
<div className="invoice" onClick={onClose}>
<div className="invoice-content" onClick={e => e.stopPropagation()}>
<span className="close" onClick={onClose}>×</span>
<h2>Faktura {invoice.nameInvoice}</h2>
<p>Customer Name: {invoice.customerName}</p>
</div>
</div>

);
};

export default Invoice;