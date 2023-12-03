import React from 'react';

class CreateInvoice extends React.Component {
   state = {
        nameInvoice: '',
    }

chandleNameInvoice = (event) => {
        this.setState({nameInvoice: event.target.value});
    }

render(){
    return(
        <>
        <h1>Create Invoice manual</h1>
        <input name='nameInvoice' 
        type='text' 
        value={this.state.nameInvoice}
        onChange={this.chandleNameInvoice} 
        placeholder='nazwa faktury'>
        </input>
        </>
    ) 
}


}

export default CreateInvoice;