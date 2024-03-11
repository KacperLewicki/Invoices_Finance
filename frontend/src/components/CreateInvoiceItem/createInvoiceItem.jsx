import React from 'react';
import "./createInvoiceItem.css";

class CreateItemInvoice extends React.Component {

 state = {
    recordsItem: JSON.parse(localStorage.getItem('recordsItem')) || [],
    nameItem: '',
    quantity: 1,
    vatItem: 0,
    nettoItem: 0,
    bruttoItem: Number,
    comment: '',
 }

 calculateBrutto = () => {
    const { nettoItem, vatItem, quantity } = this.state;
    let calculateitem = (nettoItem * (1 + vatItem / 100) * quantity).toFixed(2);  
    this.setState({bruttoItem: calculateitem});
}

 createInvoiceItem = () => {
    const { nameItem, quantity, vatItem, nettoItem, bruttoItem, comment } = this.state; 

    if (nameItem && !isNaN(parseFloat(quantity)) && !isNaN(parseFloat(vatItem)) && !isNaN(parseFloat(nettoItem))) {


        const newRecordItem = { nameItem, quantity, vatItem, nettoItem, bruttoItem, comment };
        const updatedRecordsItem = [...this.state.recordsItem, newRecordItem];

        this.setState({
            recordsItem: updatedRecordsItem,
            nameItem: '', 
            quantity: 1, 
            vatItem: 0, 
            nettoItem: 0, 
            bruttoItem: '', 
            comment: '',

        }, () => {
    
            this.props.updateItems(updatedRecordsItem); 
            localStorage.setItem('recordsItem', JSON.stringify(updatedRecordsItem));
        });

    } else {
        console.log("Error: Button don't add item - check if all fields are numbers")
    }       
}

deleteItem = (index) => {
    const updatedRecordsItem = [...this.state.recordsItem];
    updatedRecordsItem.splice(index, 1);
    this.setState({ recordsItem: updatedRecordsItem }, () => {
        localStorage.setItem('recordsItem', JSON.stringify(updatedRecordsItem));
        this.props.updateItems(updatedRecordsItem); 
    });
};

render(){

const {
    
    recordsItem,
    bruttoItem,
    nameItem, 
    quantity, 
    vatItem, 
    nettoItem, 
    comment,

} = this.state;

return(

    <>

    <h2 className='invoiceItems'>Create Items</h2>

    <input name = "nameItem" className='invoiceFormsItems' type ='text' value = {nameItem} onChange = {(e) => this.setState({nameItem: e.target.value})} placeholder ='Item name' />
    <input name="quantity" className='invoiceFormsItems' type="number" value={quantity} onChange={(e) => {this.setState({quantity: e.target.value}, this.calculateBrutto)}} placeholder='Quantity' />
    <input name = "vatItem" className='invoiceFormsItems' type = "number" value = {vatItem} onChange={(e) => {this.setState({vatItem: e.target.value}, this.calculateBrutto)}} placeholder ='VAT' />
    <input name = "nettoItem" className='invoiceFormsItems' type = "number" value = {nettoItem} onChange={(e) => {this.setState({nettoItem: e.target.value}, this.calculateBrutto)}} placeholder='Netto' />
    <input name="bruttoItem" className='invoiceFormsItems' type="number" value={bruttoItem} readOnly placeholder='Brutto' />
    <input name = "comment" className='invoiceFormsItems' type ='text' value = {comment} onChange = {(e) => this.setState({comment: e.target.value})} placeholder='comment' />
    
    <button className='invoiceTableItemsButton' type='button' onClick={this.createInvoiceItem}>Add Item</button>

    <h2 className='invoiceItems'>Items</h2>

    <table className='invoiceTableItems'>

        <thead>
            
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Vat</th>
                <th>Netto</th>
                <th>Brutto</th>
                <th>Comment</th>
            </tr>

        </thead>

        <tbody>
            {recordsItem.map((record,index) => (
                <tr key={index}>
                    <td>{record.nameItem}</td>
                    <td>{record.quantity}</td>
                    <td>{record.vatItem}</td>
                    <td>{record.nettoItem}</td>
                    <td>{record.bruttoItem}</td>
                    <td>{record.comment}</td>
                    <td><button className='buttondelate' type='button' onClick={() => this.deleteItem(index)}>Delete</button></td>

                </tr>
            ))}
        </tbody>

    </table>
    </>
)
}
}

export default CreateItemInvoice;
