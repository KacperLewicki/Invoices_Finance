import React from 'react';
import "./CreateInvoice.css";
import CreateItemInvoice from '../../components/CreateInvoiceItem/createInvoiceItem';

class CreateInvoice extends React.Component {

    constructor(props){

    super(props);

    const savedData = localStorage.getItem('invoiceFormData');

    const initialState = savedData ? JSON.parse(savedData) :  {
        nameInvoice: "",
        dataInvoice: Date,
        amountInvoice: Number, 
        status: "invoice being created",
        currency: {value: ""},
        customerName: "",
        iconsBlocked: false,
        items: [],
    };

    this.state = initialState;

  }


updateItems = (newItems) => {
    console.log('Aktualizacja items:', newItems); 
    this.setState({ items: newItems });
};


handlerInvoice = (e) => {
    const updatedState = {[e.target.name]: e.target.value};
    this.setState(updatedState, () => {
        localStorage.setItem('invoiceFormData', JSON.stringify(this.state));
    });
}

handleFormSubmit = (e) => {
    e.preventDefault();    
    

    this.props.getDataInvoiceNumber().then(newNumInvoice => {

        this.setState({ 
            iconsBlocked: true,
            status: "Invoice sent",
            nameInvoice: newNumInvoice 
        }, () => {
            this.props.onFormSubmit(this.state, this.state.items) 
            .then(() => {
               
            }).catch(error => {
                console.error(error);
                alert('Wystąpił błąd podczas tworzenia faktury lub zapisywania elementów.');
            });
        });
    });
};


addNewForms = () => {

      this.setState(this.state = {
        nameInvoice: "",
        dataInvoice: "",
        amountInvoice: 0, 
        status: "invoice being created",
        currency: "",
        customerName: "",
        iconsBlocked: false,
        items: [],
        })

        localStorage.removeItem("invoiceFormData");
        localStorage.removeItem("recordsItem");

        alert("Stworzono nowy formularz.", location.reload());
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

        <button
        className='invoiceCreateButton'
        disabled={iconsBlocked}
        type='submit'
        >      
        Send Invoice
        </button>
    
        <form 
        onSubmit={this.handleFormSubmit} 
        className='invoices_forms'>

        <input 
        className='inputValue_invoices' 
        name='nameInvoice' 
        type='text'
        value={this.state.nameInvoice} 
        disabled
        placeholder='Numer fakutry pokaże się po wysłaniu'
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
            <option hidden>Select Currency</option>
            <option>PLN</option>
            <option>EUR</option>
            <option>USD</option>
        </select>
        </label>

        <CreateItemInvoice updateItems={this.updateItems} />

        </form>
    
        </>

    ) 
}

}

export default CreateInvoice;