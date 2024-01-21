import React from 'react';
import "./createInvoiceItem.css";

class CreateItemInvoice extends React.Component {

 state = {
    nameItem: "",
    quantity: Number,
    vatItem: Number,
    nettoItem: Number,
    bruttoItem: Number,
    comment: "",
 }
 
 invoiceItem = (e) => {
    const updatedState = {[e.target.name]: e.target.value};
   
    this.setState(
        updatedState
    )
}
    
render(){


return(

    <>

    <h2 className='invoiceItems'>Create Items</h2>

    <input 
    name = "nameItem"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.nameItem}
    onChange = {this.invoiceItem}
    placeholder ='Item name' 
    />

    <input
    name = "quantity"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.quantity}
    placeholder = 'Quantity' 
    onChange = {this.invoiceItem}
    />

    <input
    name = "vatItem"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.vat}
    onChange ={this.invoiceItem}
    placeholder ='VAT' 
    />

    <input
    name = "nettoItem"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.nettoItem}
    onChange = {this.invoiceItem}
    placeholder='Netto' 
    />


    <input
    name = "bruttoItem"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.brutto}
    onChange = {this.invoiceItem}
    disabled
    placeholder='brutto' 
    />

<input
    name = "comment"
    className='invoiceFormsItems'
    type ='text'
    value = {this.state.comment}
    onChange = {this.invoiceItem}
    placeholder='comment' 
    />

     <h2 className='invoiceItems'>Items</h2>

    <ul></ul>
    </>
)
}
}

export default CreateItemInvoice;