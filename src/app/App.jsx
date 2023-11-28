import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import  {InvoiceListPage}  from '../components/invoicesPage/InvoicesPage';
import NewsPage from '../components/newsPage/NewsPage';
function App() {
  return (   
    <Router>
    <Link to="/"><button>Home</button></Link>
    <Link to="/InvoiceListPage"><button>Invoices List</button></Link> 
    <Link to="/NewsPage"><button>News Page</button></Link>

    <Routes>
        <Route path="/InvoiceListPage" element={<InvoiceListPage />} />   
        <Route path='/NewsPage' element={<NewsPage />}></Route>
    </Routes>
    </Router>

)
}

export default App;