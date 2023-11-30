import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import  {InvoiceListPage}  from '../components/invoicesPage/InvoicesPage';
import NewsPage from '../components/newsPage/NewsPage';
import "./App.css";
import CreateInvoicePage from '../CreateInvoicePage/CreateInvoicePage.jsx';

function App() {

  return (  

    <Router>
    <div className='buttons_Menu'>
    <Link to="/"><button className='button_StartMenu'>Home</button></Link>
    <Link to="/InvoiceListPage"><button className='button_StartMenu'>Invoices List</button></Link> 
    <Link to="/NewsPage"><button className='button_StartMenu'>News Page</button></Link>
    <Link to="/CreateInvoicePage"><button className='button_StartMenu'>Create Invoice</button></Link>
    </div>
    <Routes>
        <Route path="/InvoiceListPage" element={<InvoiceListPage />} />   
        <Route path='/NewsPage' element={<NewsPage />}></Route>
        <Route path='/CreateInvoicePage' element={<CreateInvoicePage />}></Route>
    </Routes>
    </Router>

)
}

export default App;