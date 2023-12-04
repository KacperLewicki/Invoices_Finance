import React from 'react';

class CreateInvoice extends React.Component {
   state = {
        nameInvoice: '',
        dataInvoice: '',
    }

chandlerInvoice = (event) => {
        this.setState({nameInvoice: event.target.value});
        this.setState({dataInvoice: event.target.value});
        
        
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
        </div>
        </>
    ) 
}


}

export default CreateInvoice;