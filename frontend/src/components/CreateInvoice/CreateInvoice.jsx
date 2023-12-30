import React from 'react';
import "./CreateInvoice.css";

class CreateInvoice extends React.Component {
  
    constructor(props){

    super(props);

    this.state = {
        nameInvoice: '',
        dataInvoice: Date,
        amountInvoice: Number, 
        status: "",
        currency: "",
        customerName: "",
    };

  }

handlerInvoice = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

invoiceCreateForm = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state); 
    }

render(){
   
    return(
        <>
        <h1 className='h1_create_invoices'>Create Invoice manual</h1>
        <form onSubmit={this.invoiceCreateForm} className='invoices_forms'>
        <input 
        className='inputValue_invoices' 
        name='nameInvoice' 
        type='text' 
        value={this.state.nameInvoice}
        onChange={this.handlerInvoice} 
        placeholder='nazwa faktury'
        />
        <input
        className='inputValue_invoices'
        name='dataInvoice'
        type='date'
        value={this.state.dataInvoice}
        onChange={this.handlerInvoice}
        />
        <input
        className='inputValue_invoices' 
        name='amountInvoice' 
        type= "Number"
        value={this.state.amountInvoice}
        onChange={this.handlerInvoice}
        placeholder='kwota'
        />
        <input
        className='inputValue_invoices' 
        name='status'
        type='text'
        value={this.state.status}
        onChange={this.handlerInvoice}
        placeholder='status'
        />
        <input
        className='inputValue_invoices' 
        name='customerName'
        type='text'
        value={this.state.customerName}
        onChange={this.handlerInvoice}
        placeholder='customer'
        />
        <input
        className='inputValue_invoices' 
        name="currency"
        type='text'
        value={this.state.currency}
        onChange={this.handlerInvoice}
        placeholder='currency'
        />

        <button
        className='invoiceCreateButton'
        type='submit'
        >
        Wyślij fakture
        </button>
       
        </form>
    
        </>

    ) 
}

}

export default CreateInvoice;