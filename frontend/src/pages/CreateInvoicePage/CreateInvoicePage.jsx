import CreateInvoice from '../../components/CreateInvoice/CreateInvoice';
import axios from 'axios';

const CreateInvoicePage = () => {

    const getDataInvoiceNumber = () => {
        
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
        <>
        <CreateInvoice 
        onFormSubmit={handleFormSubmit}  
        getDataInvoiceNumber={getDataInvoiceNumber}  
        />
        </>
    )
}

export default CreateInvoicePage;
