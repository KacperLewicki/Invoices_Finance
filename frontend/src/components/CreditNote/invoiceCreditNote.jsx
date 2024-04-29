import React, { useState } from 'react';
import "./invoiceCreditNote.css";
import axios from 'axios';

const CreditNoteInvoice = ({ invoice, onClose }) => {

    const [inputCreditNote_formData, setInputCreditNote_formData] = useState({

        CreditNote: "",
        invoiceName: invoice.nameInvoice || "",
        dataInvoice: invoice.dataInvoice || "",
        dataInvoiceSell: invoice.dataInvoiceSell || "",
        DueDate: invoice.DueDate || "",
        PaymentTerm: invoice.PaymentTerm || "",
        comments: invoice.comments || "",
        seller: invoice.seller || "",
        customerName: invoice.customerName || "",
        description: invoice.description || "",
        items: invoice.items || [],
        ExchangeRate: invoice.ExchangeRate || "",
        paymentMethod: invoice.paymentMethod || "",
        EffectiveMonth: invoice.EfectiveMonth || "",
        documentStatus: invoice.documentStatus || "",
        status: invoice.status || "",
        currency: invoice.currency || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputCreditNote_formData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (datestring) => {
        const date = new Date(datestring);
        return date.toLocaleDateString('en-CA', options);
    };

    const VAT = (brutto, netto) => brutto - netto;

    const DECIMAL = (decimal) => decimal.toFixed(2);

    const generateCreditNoteNumber = async () => {
        try {
            const response = await axios.get('http://localhost:6969/api/get-last-credit-note');
            const lastCreditNoteNumber = response.data.lastCreditNote;
            const lastNumberPart = lastCreditNoteNumber ? lastCreditNoteNumber.split('/')[1] : '0000';
            const lastNumber = parseInt(lastNumberPart, 10);
            const newNumber = lastNumber + 1;
            const newNumberPart = newNumber.toString().padStart(4, '0');
            const yearPart = new Date().getFullYear().toString().slice(-2);
            return `CN/${newNumberPart}/${yearPart}`;
        } catch (error) {
            console.error('Error generating credit note number:', error);
            
            alert('Failed to generate credit note number. Please try again.');
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const newCreditNoteNumber = await generateCreditNoteNumber();

        if (!newCreditNoteNumber) {
           
            return;
        }

       
        setInputCreditNote_formData(prevState => ({
            ...prevState,
            CreditNote: newCreditNoteNumber
        }));

        
        const formDataToSend = {
            ...inputCreditNote_formData,
            CreditNote: newCreditNoteNumber
        };

        try {
            await axios.post('http://localhost:6969/api/save-credit-note', formDataToSend);
            alert('Credit Note saved successfully.');
            onClose(); 
        } catch (error) {
           
            console.error('Error saving credit note:', error);
            alert('Failed to save Credit Note.');
        }
    };

    return (
        <div className="MainScreenCreditNote">
            <form className='invoiceCreditNote' onSubmit={handleSubmit}>
                <button className='buttonOnCLose' onClick={onClose}>X</button>
                <h1 className='h1CreditNote'>Credit Note</h1>
                <input name='CreditNote' value={inputCreditNote_formData.CreditNote} onChange={handleChange} className='inputCreditNoteFirstElementCreditNote' placeholder="Create Number CreditNote" />
                <input name='invoiceName' value={inputCreditNote_formData.invoiceName} onChange={handleChange} className='inputCreditNoteFirstElement' />
                <input name='dataInvoice' value={formatDate(inputCreditNote_formData.dataInvoice)} onChange={handleChange} className='inputCreditNote' />
                <input name='dataInvoiceSell' value={formatDate(inputCreditNote_formData.dataInvoiceSell)} onChange={handleChange} className='inputCreditNote' />
                <input name='DueDate' value={formatDate(inputCreditNote_formData.DueDate)} onChange={handleChange} className='inputCreditNote' />
                <input name='PaymentTerm' value={formatDate(inputCreditNote_formData.PaymentTerm)} onChange={handleChange} className='inputCreditNote' />
                <input name='comments' value={inputCreditNote_formData.comments} onChange={handleChange} className='inputCreditNote' />
                <input name='seller' value={inputCreditNote_formData.seller} onChange={handleChange} className='inputCreditNote' />
                <input name='customerName' value={inputCreditNote_formData.customerName} onChange={handleChange} className='inputCreditNote' />
                <input name='description' value={inputCreditNote_formData.description} onChange={handleChange} className='inputCreditNote' />
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
                            {inputCreditNote_formData.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nameItem}</td>
                                    <td>{item.quantity}</td>
                                    <td>{DECIMAL(item.bruttoItem)}</td>
                                    <td>{DECIMAL(item.nettoItem)}</td>
                                    <td>{item.vatItem + "%"}</td>
                                    <td>{DECIMAL(VAT(item.bruttoItem, item.nettoItem))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <input name='ExchangeRate' value={inputCreditNote_formData.ExchangeRate} onChange={handleChange} className='inputCreditNote' />
                <input name='paymentMethod' value={inputCreditNote_formData.paymentMethod} onChange={handleChange} className='inputCreditNote' />
                <input name='EffectiveMonth' value={inputCreditNote_formData.EfectiveMonth} onChange={handleChange} className='inputCreditNote' />
                <input name='documentStatus' value={inputCreditNote_formData.documentStatus} onChange={handleChange} className='inputCreditNote' />
                <input name='status' value={inputCreditNote_formData.status} onChange={handleChange} className='inputCreditNote' />
                <input name='currency' value={inputCreditNote_formData.currency} onChange={handleChange} className='inputCreditNote' />

                <button className='buttonCreateCreditNote' type='submit'>Create Credit Note</button>
            </form>
        </div>
    );
}

export default CreditNoteInvoice;
