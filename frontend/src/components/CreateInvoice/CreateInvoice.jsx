import React from 'react';
import "./CreateInvoice.css";

class CreateInvoice extends React.Component {

    constructor(props){

    super(props);

    const savedData = localStorage.getItem('invoiceFormData');
    const initialState = savedData ? JSON.parse(savedData) :  {
        nameInvoice: '',
        dataInvoice: Date,
        amountInvoice: Number, 
        status: "invoice being created",
        currency: {value: ""},
        customerName: "",
        iconsBlocked: false,
    };

    this.state = initialState;

  }

handlerInvoice = (e) => {
    const updatedState = {[e.target.name]: e.target.value};
    this.setState(updatedState, () => {
        localStorage.setItem('invoiceFormData', JSON.stringify(this.state));
    });
}

handleFormSubmit = (e) => {

    e.preventDefault();
    this.setState({
        iconsBlocked: true,
        status: "Invoice sent",
        
    
    });
    setTimeout(()=> {
        this.props.onFormSubmit(this.state); 
    },1000)   
    };

addNewForms = () => {

    this.setState(this.state = {
    nameInvoice: '',
    dataInvoice: "",
    amountInvoice: 0, 
    status: "invoice being created",
    currency: "",
    customerName: "",
    iconsBlocked: false,

    });

    alert("Stworzono nowy formularz.");
}

render(){

    const { iconsBlocked } = this.state;
   
    return(
        <>
        <h1 className='h1_create_invoices'>Create Invoice manual</h1>

        <button 
        onClick={this.addNewForms}
        className='addNewFormButton'
        >New Forms</button>
    
        <form 
        onSubmit={this.handleFormSubmit} 
        className='invoices_forms'>
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
        value={this.state.status}
        disabled
        onChange={this.handlerInvoice}
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
        <label>
        <select
        className='inputValue_invoices' 
        name="currency"
        type='text'
        value={this.state.currency}
        disabled={iconsBlocked}
        onChange={this.handlerInvoice}
        >
            <option disabled hidden>Select Option</option>
            <option>PLN</option>
            <option>EUR</option>
            <option>USD</option>
        </select>
        </label>

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