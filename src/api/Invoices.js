import axios from './axios'; 

export class InvoicesApi {
    static async getAll() {
        try {
            const response = await axios.get("https://mocki.io/v1/65969a5d-f0c3-4521-859e-9769d4c5f26d"); 
            return response.data.invoices;
        } catch (error) {
            console.error('Error fetching invoices:', error);
            return []; 
        }
    }
}

