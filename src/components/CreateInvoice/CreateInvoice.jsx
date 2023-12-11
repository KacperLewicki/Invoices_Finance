import React from 'react';

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
        <div>
        <h1>Create Invoice manual</h1>
        <input name='nameInvoice' 
        type='text' 
        value={this.state.nameInvoice}
        onChange={this.chandlerInvoice} 
        placeholder='nazwa faktury'>
        </input>
        <input name='dataInvoice'
        type='date'
        value={this.state.dataInvoice}
        onChange={this.chandlerInvoice}
        ></input>
        <input name='amountInvoice' 
        type="text"
        value={this.state.amountInvoice}
        onChange={this.chandlerInvoice}
        placeholder='kwota'>
        </input>
        </div>
        </>

    ) 
}


}

export default CreateInvoice;