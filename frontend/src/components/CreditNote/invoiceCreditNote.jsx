import React, { useState, useEffect, useCallback } from 'react';
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
        summaryNetto: null,
        summaryBrutto: null,
        summaryVat: null,
        ExchangeRate: invoice.ExchangeRate || "",
        paymentMethod: invoice.paymentMethod || "",
        EffectiveMonth: invoice.EfectiveMonth || "",
        documentStatus: invoice.documentStatus || "",
        status: invoice.status || "",
        currency: invoice.currency || ""
    });

    const handleInputChange = useCallback((index, field, value) => {

        setInputCreditNote_formData(prevData => {

            const newItems = [...prevData.items];
            const item = newItems[index];
     
            const numericValue = parseFloat(value) || 0;
    
            if (field === 'quantity') {
                const oldQuantity = item.quantity || 1; 
                const unitNetto = item.unitNetto || (item.nettoItem / oldQuantity); 
                item.quantity = numericValue;
                item.unitNetto = unitNetto; 
                item.nettoItem = parseFloat((unitNetto * numericValue).toFixed(2));
                item.bruttoItem = parseFloat((item.nettoItem * (1 + item.vatItem / 100)).toFixed(2));

            } else if (field === 'bruttoItem') {
                item.bruttoItem = parseFloat(numericValue.toFixed(2));
                item.nettoItem = parseFloat((numericValue / (1 + item.vatItem / 100)).toFixed(2));

            } else if (field === 'nettoItem') {
                item.nettoItem = parseFloat(numericValue.toFixed(2));
                item.bruttoItem = parseFloat((numericValue * (1 + item.vatItem / 100)).toFixed(2));

            } else if (field === 'vatItem') {
                item.vatItem = numericValue;
                item.bruttoItem = parseFloat((item.nettoItem * (1 + numericValue / 100)).toFixed(2));
            } else {
            
                item[field] = value;
            }
    
            newItems[index] = item;
            return { ...prevData, items: newItems };
        });
    }, []);
    
    useEffect(() => {
        
        setInputCreditNote_formData(prevData => {
            const newItems = prevData.items;
            const summaryNetto = newItems.reduce((acc, item) => acc + parseFloat(item.nettoItem), 0).toFixed(2);
            const summaryBrutto = newItems.reduce((acc, item) => acc + parseFloat(item.bruttoItem), 0).toFixed(2);
            const summaryVat = (parseFloat(summaryBrutto) - parseFloat(summaryNetto)).toFixed(2);
        
            return { ...prevData, summaryNetto: parseFloat(summaryNetto), summaryBrutto: parseFloat(summaryBrutto), summaryVat: parseFloat(summaryVat) };
        });
    }, [inputCreditNote_formData.items]);


    const handleAddNewItem = useCallback(() => {

        setInputCreditNote_formData(prevData => ({

          ...prevData,
          items: [
            ...prevData.items,
            { nameItem: '', quantity: 1, bruttoItem: 0, nettoItem: 0, vatItem: 23, unitNetto: 0 } 
          ]
        }));
    }, []);

    const handleRemoveItem = useCallback((index) => {

        setInputCreditNote_formData(prevData => ({
            ...prevData,
            items: prevData.items.filter((item, i) => i !== index)     
        }));

    }, []);
    
      
    
    const VAT = (brutto, netto) => {
        
        return (Number(brutto) - Number(netto)).toFixed(2);

    };


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

    
    const handleSubmit = async (e) => {

        e.preventDefault();
    
        const formDataToSend = {
            ...inputCreditNote_formData,
        };
    
        try {
            const response = await axios.post('http://localhost:6969/api/SaveCreditNote', formDataToSend);
            alert('Credit Note saved successfully.');
    
            setInputCreditNote_formData(prevState => ({
                ...prevState,
                CreditNote: response.data.newCreditNoteNumber
            }));
   
        setTimeout(() => {
            onClose();  
        }, 3000);
            
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
                <input title="Invoice Name" name='invoiceName' value={inputCreditNote_formData.invoiceName} onChange={handleChange} className='inputCreditNoteFirstElement' />
                <input title="Data Invoice" name='dataInvoice' value={formatDate(inputCreditNote_formData.dataInvoice)} onChange={handleChange} className='inputCreditNote' />
                <input title="Data Invoice Sell" name='dataInvoiceSell' value={formatDate(inputCreditNote_formData.dataInvoiceSell)} onChange={handleChange} className='inputCreditNote' />
                <input title="Due Date" name='DueDate' value={formatDate(inputCreditNote_formData.DueDate)} onChange={handleChange} className='inputCreditNote' />
                <input title="Payment Term" name='PaymentTerm' value={formatDate(inputCreditNote_formData.PaymentTerm)} onChange={handleChange} className='inputCreditNote' />
                <input title="Comments" name='comments' value={inputCreditNote_formData.comments} onChange={handleChange} className='inputCreditNote' />
                <input title="Seller" name='seller' value={inputCreditNote_formData.seller} onChange={handleChange} className='inputCreditNote' />
                <input title="Customer Name" name='customerName' value={inputCreditNote_formData.customerName} onChange={handleChange} className='inputCreditNote' />
                <input title="Description" name='description' value={inputCreditNote_formData.description} onChange={handleChange} className='inputCreditNote' />
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
                                    <td><input type='text' value={item.nameItem} onChange={(e) => handleInputChange(index, 'nameItem', e.target.value)} /></td>
                                    <td><input type='number'  value={item.quantity} onChange={(e) => handleInputChange(index, 'quantity', e.target.value)} /></td>
                                    <td><input type='number' value={item.bruttoItem.toFixed(2)} onChange={(e) => handleInputChange(index, 'bruttoItem', e.target.value)} /></td>
                                    <td><input type='number' value={item.nettoItem.toFixed(2)} onChange={(e) => handleInputChange(index, 'nettoItem', e.target.value)} /></td>
                                    <td><input type='number'  value={item.vatItem} onChange={(e) => handleInputChange(index, 'vatItem', e.target.value)} /></td>
                                    <td>{VAT(item.bruttoItem, item.nettoItem)}</td>
                                    <td><button className='buttonTable_delete' type='button' onClick={() => handleRemoveItem(index)}>Delete</button></td>
                                </tr>
                                ))}
                                <tr><td colSpan="7"><button className='buttonTable_plus' type='button' onClick={handleAddNewItem}>+</button></td></tr>
                            </tbody>
                    </table>
                </div>
                <input title="Summary Netto" name='summaryNetto' type="number" value={inputCreditNote_formData.summaryNetto} onChange={handleChange} className='inputCreditNote' defaultValue={inputCreditNote_formData.summaryNetto} />
                <input title="Summary Brutto" name='summaryBrutto' type="number" value={inputCreditNote_formData.summaryBrutto} onChange={handleChange} className='inputCreditNote' defaultValue={inputCreditNote_formData.summaryBrutto} />
                <input title="Summary Vat" name='summaryVat' type="number" value={inputCreditNote_formData.summaryVat} onChange={handleChange} className='inputCreditNote' defaultValue={inputCreditNote_formData.summaryVat} />
                <input title="Exchange Rate" name='ExchangeRate' value={inputCreditNote_formData.ExchangeRate} onChange={handleChange} className='inputCreditNote' />
                <input title="Payment Method" name='paymentMethod' value={inputCreditNote_formData.paymentMethod} onChange={handleChange} className='inputCreditNote' />
                <input title="Effective Month" name='EffectiveMonth' value={inputCreditNote_formData.EffectiveMonth} onChange={handleChange} className='inputCreditNote' />
                <input title="Document Status" name='documentStatus' value={inputCreditNote_formData.documentStatus} onChange={handleChange} className='inputCreditNote' />
                <input title="Status" name='status' value={inputCreditNote_formData.status} onChange={handleChange} className='inputCreditNote' />
                <input title="Currency" name='currency' value={inputCreditNote_formData.currency} onChange={handleChange} className='inputCreditNote' />

                <button className='buttonCreateCreditNote' type='submit'>Create Credit Note</button>
            </form>
        </div>
    );
}

export default CreditNoteInvoice;
