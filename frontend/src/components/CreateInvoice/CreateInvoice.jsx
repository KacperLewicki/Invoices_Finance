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
        iconsBlocked: false,
    };

  }

handlerInvoice = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

invoiceCreateForm = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state); 
    this.setState({iconsBlocked: true});

    };

render(){

    const { iconsBlocked } = this.state
   
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
        disabled={iconsBlocked}
        placeholder='nazwa faktury'
        />
        <input
        className='inputValue_invoices'
        name='dataInvoice'
        type='date'
        value={this.state.dataInvoice}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        />
        <input
        className='inputValue_invoices' 
        name='amountInvoice' 
        type= "Number"
        value={this.state.amountInvoice}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        placeholder='kwota'
        />
        <input
        className='inputValue_invoices' 
        name='status'
        type='text'
        value={this.state.status}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        placeholder='status'
        />
        <input
        className='inputValue_invoices' 
        name='customerName'
        type='text'
        value={this.state.customerName}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        placeholder='customer'
        />
        <input
        className='inputValue_invoices' 
        name="currency"
        type='text'
        value={this.state.currency}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        placeholder='currency'
        />

        <button
        className='invoiceCreateButton'
        disabled={iconsBlocked}
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