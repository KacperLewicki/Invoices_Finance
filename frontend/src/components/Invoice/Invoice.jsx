import React, {useState} from 'react';
import "./Invoice.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CreditNoteInvoice from '../CreditNote/invoiceCreditNote';

const Invoice = ({ invoice, onClose }) => {
    
  const [showCreditNote, setShowCreditNote] = useState(false);
  
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (datestring) => {
        const date = new Date(datestring);
        return date.toLocaleDateString('en-CA', options);
    };

    const VAT = (brutto, netto) => {
       const result =  brutto - netto;

       return result
    };

    const DECIMAL = (decimal) => {

      const dec = decimal.toFixed(2);
      return dec
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
        pdf.save(invoice.nameInvoice);
      });
    };

  const handleButtonClick = () => {

      setShowCreditNote(true);  

  };

    return (
        <div className="invoice" onClick={onClose}>
         
         {showCreditNote && (
            <div className="credit-note-overlay" onClick={e => e.stopPropagation()}>
                 <CreditNoteInvoice invoice={invoice} onClose={onClose} />          
            </div>
        )}

            <div className="invoice-content_main" onClick={e => e.stopPropagation()}>
          
                <div id="invoice-content_main" >
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
                                    <td>{DECIMAL(item.bruttoItem)}</td>
                                    <td>{DECIMAL(item.nettoItem)}</td>
                                    <td>{item.vatItem + "%"}</td>
                                    <td>{DECIMAL(VAT(item.bruttoItem,item.nettoItem))}</td>
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
          <td>{DECIMAL(invoice.summaryNetto)}</td>
        </tr>
        <tr>
          <td>Summary Vat:</td>
          <td>{DECIMAL(invoice.summaryVat)}</td>
        </tr>
        <tr>
          <td>Summary Brutto:</td>
          <td>{DECIMAL(invoice.summaryBrutto)}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>

<button className='buttonInvoiceList' onClick={downloadPdf}>Pobierz PDF</button>
<button className='buttonInvoiceList' onClick={handleButtonClick}>Credit Note</button>
            </div>   
        </div>
    );
};

export default Invoice;
