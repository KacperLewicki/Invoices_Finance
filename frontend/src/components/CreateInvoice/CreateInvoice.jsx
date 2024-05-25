import React from 'react';
import "./CreateInvoice.css";
import CreateItemInvoice from '../../components/CreateInvoiceItem/createInvoiceItem';

class CreateInvoice extends React.Component {

    constructor(props) {
        super(props);
      

        const savedData = localStorage.getItem('invoiceFormData');

        const summaryBrutto = parseFloat(localStorage.getItem('summaryBrutto')) || 0;
        const summaryNetto = parseFloat(localStorage.getItem('summaryNetto')) || 0;
        const summaryVat = parseFloat(localStorage.getItem('summaryVat')) || 0;
      
        const initialState = savedData ? JSON.parse(savedData) : {
          nameInvoice: "",
          dataInvoice: new Date(), 
          dataInvoiceSell: new Date(),
          DueDate: new Date(),
          PaymentTerm: new Date(),
          comments: "",
          seller: "",
          description: "",
          summaryNetto, 
          summaryVat, 
          summaryBrutto, 
          ExchangeRate: 0,
          paymentMethod: "Bank transfer",
          EfectiveMonth: {value: ""},
          documentStatus: {value: ""},
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
    this.setState({ items: newItems }, this.updateSummaryCost);
  
};

updateSummaryCost = () => {
    const { items } = this.state;

    const summaryBrutto = items.reduce((score, item) => score + Number(item.bruttoItem), 0);
    const summaryNetto = items.reduce((score, item) => score + Number(item.nettoItem), 0);
    const summaryVat = summaryBrutto - summaryNetto;

    this.setState({
      summaryBrutto,
      summaryNetto,
      summaryVat
    }, () => {
      localStorage.setItem('summaryBrutto', this.state.summaryBrutto);
      localStorage.setItem('summaryNetto', this.state.summaryNetto);
      localStorage.setItem('summaryVat', this.state.summaryVat);
      localStorage.setItem('invoiceFormData', JSON.stringify(this.state));
    });
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

               console.log(`wykonało sie to co musiało ${this.state.nameInvoice} i ${this.state.items}`)
            
            }).catch(error => {

                console.error(error);
                alert('Wystąpił błąd podczas tworzenia faktury lub zapisywania elementów.');
            
            });
        });
    });
};

addNewForms = () => {

      this.setState({
        nameInvoice: "",
        dataInvoice: null,
        dataInvoiceSell: null,
        DueDate: null,
        PaymentTerm: null,
        summaryNetto: null,
        summaryVat: null,
        summaryBrutto: null,
        ExchangeRate: null,
        seller: "", 
        description: "",
        paymentMethod: "Bank transfer",
        EfectiveMonth: "",
        documentStatus: "",
        status: "invoice being created",
        currency: "",
        customerName: "",
        iconsBlocked: false,
        items: [],
        })

        localStorage.removeItem("invoiceFormData");
        localStorage.removeItem("recordsItem");
        localStorage.removeItem("summaryBrutto");
        localStorage.removeItem("summaryNetto");
        localStorage.removeItem("summaryVat");
        alert("Stworzono nowy formularz.", window.location.reload());
}

render(){

    const { iconsBlocked } = this.state;

    return(
        <>
        <h1 className='h1_create_invoices'>Create Invoice manual</h1> 
   
        <form className='invoices_forms' onSubmit={this.handleFormSubmit}>

        <button type='button' onClick={this.addNewForms} className='addNewFormButton'>New Forms</button>

        <input className='inputValue_invoices' name='nameInvoice' type='text' value={this.state.nameInvoice} disabled placeholder='The fax number will be shown after sending'/>
        <input className='inputValue_invoices' name='dataInvoice' type="date" required disabled={iconsBlocked} value={this.state.dataInvoice} onChange={this.handlerInvoice} placeholder='Issue date'/>
        <input className='inputValue_invoices' name='dataInvoiceSell' type='date' placeholder='Sell-by date' required value={this.state.dataInvoiceSell} disabled={iconsBlocked} onChange={this.handlerInvoice}/>
        <input className='inputValue_invoices' name='status' value={this.state.status} disabled onChange={this.handlerInvoice}/>
        <input className='inputValue_invoices' name='seller' type= "text" value={this.state.seller} disabled={iconsBlocked} onChange={this.handlerInvoice} placeholder='Seller'/>
        <input className='inputValue_invoices' name='customerName' type='text' value={this.state.customerName} disabled={iconsBlocked} onChange={this.handlerInvoice} placeholder='Customer'/>
        <textarea className='inputValue_invoices' name='description' type='text' value={this.state.description} disabled={iconsBlocked} onChange={this.handlerInvoice} placeholder='description'/>
        <label>
        <select className='inputValue_invoices' name="EfectiveMonth" type='text' value={this.state.EfectiveMonth} disabled={iconsBlocked} onChange={this.handlerInvoice}>
            <option hidden>Efective month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
        </select>
        </label>

        <CreateItemInvoice updateItems={this.updateItems} /> 
       
        <h2 className='summaryh2'>Summary</h2>
        <input className='inputValue_invoices' type='Number' name='summaryNetto' value={this.state.summaryNetto} onChange={this.handlerInvoice} placeholder='Netto' disabled />
        <input className='inputValue_invoices' type='Number' name='summaryVat' value={this.state.summaryVat} onChange={this.handlerInvoice} placeholder='Vat' disabled/>
        <input className='inputValue_invoices' type='Number' name='summaryBrutto' value={this.state.summaryBrutto} onChange={this.handlerInvoice} placeholder='Total'disabled />

        <label>
        <select className='inputValue_invoices' name="currency" type='text' value={this.state.currency} disabled={iconsBlocked} onChange={this.handlerInvoice}>
            <option hidden>Select Currency</option>
            <option>PLN</option>
            <option>EUR</option>
            <option>USD</option>
        </select>
        </label>
        <input className='inputValue_invoices' name='paymentMethod' value={this.state.paymentMethod} disabled onChange={this.handlerInvoice} />     
        <input className='inputValue_invoices' type='Number' name='ExchangeRate' value={this.state.ExchangeRate} onChange={this.handlerInvoice} placeholder='Exchange rate' />
        <input className='inputValue_invoices' name='DueDate' type='date' placeholder='Due Date' required value={this.state.DueDate} disabled={iconsBlocked} onChange={this.handlerInvoice}/>
     

       
        <h2 className='detailsh2'>Details</h2>
        <select className='inputValue_invoices' name="documentStatus" type='text' value={this.state.documentStatus} disabled={iconsBlocked} onChange={this.handlerInvoice}>
            <option hidden>Document Status</option>
            <option>Issued</option>
            <option>Paid</option>
            <option>Partly Paid</option>
            <option>Settled</option>
            <option>Corrected</option>

        </select>
        <input className='inputValue_invoices' name='PaymentTerm' type='date' placeholder='Payment term' required value={this.state.PaymentTerm} disabled={iconsBlocked} onChange={this.handlerInvoice}/>
        <textarea className='inputValue_invoices' name='comments' type='text' value={this.state.comments} disabled={iconsBlocked} onChange={this.handlerInvoice} placeholder='Comments'/>
        
        <button className='invoiceCreateButton' disabled={iconsBlocked} type='submit'> Send Invoice </button>
        </form> 
        </>

    ) 
}

}

export default CreateInvoice;