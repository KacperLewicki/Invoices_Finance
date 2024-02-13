import CreateInvoice from '../../components/CreateInvoice/CreateInvoice';
import axios from 'axios';

const CreateInvoicePage = () => {

    let getDataInvoiceNumber = () => {
        
       const apiEndPoint = "http://localhost:6969/invoice_manualformsInvoiceNumber";
        
            return axios.get(apiEndPoint).then(
            
                res => {
                    const lastNumber = res.data;
                    const currentYear = new Date().getFullYear().toString().slice(-2);
                    console.log(lastNumber);
                    const lastNumArr = lastNumber.split("/");
                    console.log(lastNumArr);
                    const lastNumParse = parseInt(lastNumArr[1],10);
                    console.log(lastNumParse);
                    const nextNum = lastNumParse + 1;
                    console.log(nextNum);
                    const newNumInvoice = `FV/${nextNum.toString().padStart(4,"0")}/${currentYear}`;
                    console.log(newNumInvoice);
                    return newNumInvoice;
                }
            ) 
        }

    let handleFormSubmit = (formData, items) => { 
            const apiEndPoint = "http://localhost:6969/invoice_manualforms";
            
            return axios.post(apiEndPoint, formData) 
                .then(response => {
                    alert('Faktura została pomyślnie utworzona.');
    
                    if (!Array.isArray(items)) {
                        throw new Error('Items should be an array');
                    }

                    const itemsEndPoint = "http://localhost:6969/invoice_items"; 
                    console.log('Wysyłanie do backendu:', { items, invoiceId: response.data.invoiceId });
                    return axios.post(itemsEndPoint, { 
                        items, 
                        invoiceId: response.data.invoiceId 
                    });
                })
                .then(response => {

                    // dodatkowa logika przy wysyłaniu danych 
                })
                .catch(error => {
            
                    console.error('Error:', error.response || error);
                    alert('Wystąpił błąd podczas tworzenia faktury lub zapisywania elementów.');
                });
        };

    return (
        <CreateInvoice 
        onFormSubmit={handleFormSubmit}  
        getDataInvoiceNumber={getDataInvoiceNumber}  
        />
    )
}

export default CreateInvoicePage;
