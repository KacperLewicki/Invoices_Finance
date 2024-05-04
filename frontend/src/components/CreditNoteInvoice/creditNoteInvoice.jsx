import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './creditNoteInvoice';

const InvoiceListCreditNote = ({ creditNoteInvoice, onClose }) => {

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  const formatDate = (datestring) => {
      const date = new Date(datestring);
      return date.toLocaleDateString('en-CA', options);
  };

  const VAT = (brutto, netto) => {
     const result =  (brutto - netto).toFixed(2);

     return result
  };

  
  const downloadPdf = () => {
      
    const invoiceElement = document.getElementById('invoice-content_main');
 
      invoiceElement.style.margin = '2';
      invoiceElement.style.padding = '2';
    
      html2canvas(invoiceElement, {

        onclone: (documentClone) => {
          const cloneInvoiceElement = documentClone.getElementById('invoice-content_main');
          cloneInvoiceElement.style.background = 'white';
        }
      }).then((canvas) => {

        const orientation = canvas.width > canvas.height ? 'l' : 'p';
        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [canvas.width, canvas.height] 
        });
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(creditNoteInvoice.nameInvoice);
      });
    };


    return (
      <>
        <div className="invoice" onClick={onClose}>
        
        <div className="invoice-content_main" onClick={e => e.stopPropagation()}>
          
          <div id="invoice-content_main" >
          <div className="invoice-header">
              <h2 className='invoice-title'>Faktura {creditNoteInvoice.CreditNote}</h2>
          </div>
          <div className="invoice-details">
              <div className="invoice-details-left">
                  <div className="invoice-section">
                      <p className='customer_name_p'>Invoice: <span className='span_p'>{creditNoteInvoice.invoiceName}</span> </p>
                      <p className='customer_name_p'>Customer Name: <span className='span_p'>{creditNoteInvoice.customerName}</span> </p>
                      <p className='customer_name_p'>Seller: <span className='span_p'>{creditNoteInvoice.seller}</span></p>
                      <p className='customer_name_p'>Efective Month:<span className='span_p'>{creditNoteInvoice.EffectiveMonth}</span></p>
                      <p className='customer_name_p'>Status:<span className='span_p'>{creditNoteInvoice.status}</span></p>
                      <br />
                     
              </div>
              </div>
              <div className="invoice-details-right">
                 
                  <div className="invoice-section">
                  <p className='customer_name_p'>Data Invoice:<span className='span_p'>{formatDate(creditNoteInvoice.dataInvoice)}</span></p>
                      <p className='customer_name_p'>Data Sell:<span className='span_p'>{formatDate(creditNoteInvoice.dataInvoiceSell)}</span></p>
                      <p className='customer_name_p'> Due Date: <span className='span_p'>{formatDate(creditNoteInvoice.DueDate)}</span> </p>
                      <p className='customer_name_p'>Payment Term: <span className='span_p'>{formatDate(creditNoteInvoice.PaymentTerm)}</span> </p>
                  
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
                      {creditNoteInvoice.items.map((item, index) => (
                          <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.itemName}</td>
                              <td>{item.quantity}</td>
                              <td>{item.bruttoItem}</td>
                              <td>{item.nettoItem}</td>
                              <td>{item.vatItem + "%"}</td>
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
    <td>{creditNoteInvoice.ExchangeRate}</td>
  </tr>
  <tr>
    <td>Payment Method:</td>
    <td>{creditNoteInvoice.paymentMethod}</td>
  </tr>
  <tr>
    <td>Effective Month:</td>
    <td>{creditNoteInvoice.EffectiveMonth}</td>
  </tr>
  <tr>
    <td>Currency:</td>
    <td>{creditNoteInvoice.currency}</td>
  </tr>
</tbody>
</table>
</div>
<div className="invoice-details-right">
<table className="invoice-details-table">
<tbody>
  <tr>
    <td>Summary Netto:</td>
    <td>{creditNoteInvoice.summaryNetto}</td>
  </tr>
  <tr>
    <td>Summary Vat:</td>
    <td>{creditNoteInvoice.summaryVat}</td>
  </tr>
  <tr>
    <td>Summary Brutto:</td>
    <td>{creditNoteInvoice.summaryBrutto}</td>
  </tr>
</tbody>
</table>
</div>
</div>
</div>

<button className='buttonInvoiceList'  onClick={downloadPdf}>Pobierz PDF</button>
      </div> 
        </div>
      </>  
    );
};

export default InvoiceListCreditNote;
