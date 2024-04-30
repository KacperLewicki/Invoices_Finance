import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceListCreditNote = ({ invoice, onClose }) => {
    
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


    return (
      <>
        <div onClick={onClose}>
        
            <div className="invoice-content_main" onClick={e => e.stopPropagation()}>
          
                <div>
                <div>
                    <h2 >Faktura {invoice.CreditNote}</h2>
                </div>
              
               <button onClick={downloadPdf}>Pobierz PDF</button>

               </div>  
            </div> 
        </div>
      </>  
    );
};

export default InvoiceListCreditNote;
