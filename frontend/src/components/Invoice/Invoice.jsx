import React from 'react';
import "./Invoice.css";

const Invoice = ({ invoice, onClose }) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (datestring) => {
        const date = new Date(datestring);
        return date.toLocaleDateString('en-CA', options);
    };

    const VAT = (brutto, netto) => {
       const result =  brutto - netto;

       return result
    }

    return (
        <div className="invoice" onClick={onClose}>
            <div className="invoice-content_main" onClick={e => e.stopPropagation()}>
                <div className="invoice-header">
                    <h2 className='invoice-title'>Faktura {invoice.nameInvoice}</h2>
                </div>
                <div className="invoice-details">
                    <div className="invoice-details-left">
                        <div className="invoice-section">
                            <p className='customer_name_p'>Customer Name: <span className='span_p'>{invoice.customerName}</span> </p>
                            <p className='customer_name_p'>Seller: <span className='span_p'>{invoice.seller}</span></p>
                            <p className='customer_name_p'>Efective Month:<span className='span_p'>{invoice.EfectiveMonth}</span></p>
                            <p className='customer_name_p'>Status:<span className='span_p'>{invoice.status}</span></p>
                            <br />
                           
                    </div>
                    </div>
                    <div className="invoice-details-right">
                       
                        <div className="invoice-section">
                        <p className='customer_name_p'>Data Invoice:<span className='span_p'>{formatDate(invoice.dataInvoice)}</span></p>
                            <p className='customer_name_p'>Data Sell:<span className='span_p'>{formatDate(invoice.dataInvoiceSell)}</span></p>
                            <p className='customer_name_p'> Due Date: <span className='span_p'>{formatDate(invoice.DueDate)}</span> </p>
                            <p className='customer_name_p'>Payment Term: <span className='span_p'>{formatDate(invoice.PaymentTerm)}</span> </p>
                        
                        </div>
                    </div>
                  
                </div>
                <div className="invoice-table-container">
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Service Name</th>
                                <th>Qty</th>
                                <th>Brutto</th>
                                <th>Net</th>
                                <th>VAT %</th>
                                <th>VAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nameItem}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.bruttoItem}</td>
                                    <td>{item.nettoItem}</td>
                                    <td>{item.vatItem}</td>
                                    <td>{VAT(item.bruttoItem,item.nettoItem)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-details">
  <div className="invoice-details-left">
    <table className="invoice-details-table">
      <tbody>
        <tr>
          <td>Exchange Rate:</td>
          <td>{invoice.ExchangeRate}</td>
        </tr>
        <tr>
          <td>Payment Method:</td>
          <td>{invoice.paymentMethod}</td>
        </tr>
        <tr>
          <td>Effective Month:</td>
          <td>{invoice.EfectiveMonth}</td>
        </tr>
        <tr>
          <td>Currency:</td>
          <td>{invoice.currency}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="invoice-details-right">
    <table className="invoice-details-table">
      <tbody>
        <tr>
          <td>Summary Netto:</td>
          <td>{invoice.summaryNetto}</td>
        </tr>
        <tr>
          <td>Summary Vat:</td>
          <td>{invoice.summaryVat}</td>
        </tr>
        <tr>
          <td>Summary Brutto:</td>
          <td>{invoice.summaryBrutto}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

            </div>
        </div>
    );
};

export default Invoice;
