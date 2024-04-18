import React from 'react';
import "./Invoice.css"

const Invoice = ({ invoice, onClose }) => {

return (
<div className="invoice" onClick={onClose}>
<div className="invoice-content" onClick={e => e.stopPropagation()}>
<span className="close" onClick={onClose}>×</span>
<h2>Faktura {invoice.nameInvoice}</h2>
<p>Customer Name: {invoice.customerName}</p>
<div className="invoice-items">
                <h3>Items</h3>
                <ul className="invoice-items_ul">
                    {invoice.items.map(item => (
                        <li key={item.id}>{item.nameItem}</li>
                    ))}
                </ul>
            </div>
</div>
</div>

);
};

export default Invoice;