import React from 'react';
import "./invoiceCreditNote.css";

const CreditNoteInvoice = ({ invoice, onClose}) => {

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

    return (
        <div className="MainScreenCreditNote">

            <form className='invoiceCreditNote'>

            <h1 className='h1CreditNote'>Credit Note</h1>
            <input className='inputCreditNoteFirstElementCreditNote' placeholder="Create Number CreditNote" />
            <input className='inputCreditNoteFirstElement' defaultValue={invoice.nameInvoice} />
            <input className='inputCreditNote' defaultValue={formatDate(invoice.dataInvoice)} />
            <input className='inputCreditNote' defaultValue={formatDate(invoice.dataInvoiceSell)} />
            <input className='inputCreditNote' defaultValue={formatDate(invoice.DueDate)} />
            <input className='inputCreditNote' defaultValue={formatDate(invoice.PaymentTerm)} />
            <input className='inputCreditNote' defaultValue={invoice.comments} />
            <input className='inputCreditNote' defaultValue={invoice.seller} />
            <input className='inputCreditNote' defaultValue={invoice.customerName} />
            <input className='inputCreditNote' defaultValue={invoice.description} />
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
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={index + 1} /></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={item.nameItem}></input></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={item.quantity}></input></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={DECIMAL(item.bruttoItem)}></input></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={DECIMAL(item.nettoItem)}></input></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={item.vatItem + "%"}></input></td>
                                    <td><input className='inputTableInvoiceCreditNote' defaultValue={DECIMAL(VAT(item.bruttoItem,item.nettoItem))}></input></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            <input className='inputCreditNote' defaultValue={0} />
            <input className='inputCreditNote' defaultValue={0} />
            <input className='inputCreditNote' defaultValue={0} />
            <input className='inputCreditNote' defaultValue={invoice.ExchangeRate} />
            <input className='inputCreditNote' defaultValue={invoice.paymentMethod} />
            <input className='inputCreditNote' defaultValue={invoice.EfectiveMonth} />
            <input className='inputCreditNote' defaultValue={invoice.documentStatus} />
            <input className='inputCreditNote' defaultValue={invoice.status} />
            <input className='inputCreditNote' defaultValue={invoice.currency} />

            <button>Create Credit Note</button>
    
            <button onClick={onClose}>Zamknij</button>

            </form>
        </div>
    );
}

export default CreditNoteInvoice;