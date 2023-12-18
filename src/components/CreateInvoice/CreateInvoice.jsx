import React from 'react';
import "./CreateInvoice.css";

class CreateInvoice extends React.Component {
   state = {
        nameInvoice: '',
        dataInvoice: '',
        amountInvoice: '', 
    }

chandlerInvoice = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

render(){
    return(
        <>
        <h1 className='h1_create_invoices'>Create Invoice manual</h1>
        <div className='invoices_forms'>
        <input 
        className='inputValue_invoices' 
        name='nameInvoice' 
        type='text' 
        value={this.state.nameInvoice}
        onChange={this.chandlerInvoice} 
        placeholder='nazwa faktury'
        />
        <input
        className='inputValue_invoices'
        name='dataInvoice'
        type='date'
        value={this.state.dataInvoice}
        onChange={this.chandlerInvoice}
        />
        <input
        className='inputValue_invoices' 
        name='amountInvoice' 
        type="text"
        value={this.state.amountInvoice}
        onChange={this.chandlerInvoice}
        placeholder='kwota'
        />
        <input
        className='inputValue_invoices' 
        name='status'
        type='text'
        value={this.state.status}
        onChange={this.chandlerInvoice}
        placeholder='status'
        />
        <input
        className='inputValue_invoices' 
        name='customer'
        type='text'
        value={this.state.customerName}
        onChange={this.chandlerInvoice}
        placeholder='customer'
        />
        <input
        className='inputValue_invoices' 
        name="currency"
        type='text'
        value={this.state.currency}
        onChange={this.chandlerInvoice}
        placeholder='currency'
        />

        <button
        className='invoiceCreateButton'
        name='InvoiceCreateButton'
        onClick={this.InvoiceCreateButtonOnChange}>
        Wyślij fakture
        </button>
       
        </div>
    
        </>

    ) 
}

}

export default CreateInvoice;