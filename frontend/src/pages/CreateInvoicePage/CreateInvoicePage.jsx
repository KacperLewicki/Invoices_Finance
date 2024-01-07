import CreateInvoice from '../../components/CreateInvoice/CreateInvoice';
import axios from 'axios';

const CreateInvoicePage = () => {
      
    const handleFormSubmit = (formData) => {

        const apiEndPoint = "http://localhost:6969/invoice_manualforms";

        axios.post(apiEndPoint,formData)
        .then(response => {
            alert('Faktura została pomyślnie utworzona.');
            console.log(response.data);
        })

        .catch(error => {
           console.log ('Wystąpił błąd podczas tworzenia faktury.');
           console.error(error);
        })  
    };

    return (
        <CreateInvoice onFormSubmit={handleFormSubmit}  />

    )
}

export default CreateInvoicePage;
