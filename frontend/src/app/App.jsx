import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import  {InvoiceListPage}  from '../pages/invoicesPage/InvoicesPage';
import NewsPage from '../pages/newsPage/NewsPage';
import "./App.css";
import CreateInvoicePage from '../pages/CreateInvoicePage/CreateInvoicePage.jsx';
import React, { useState, useEffect } from 'react';
import { CreditNotePage } from '../pages/creditNotePage/creditNotePage';

function App() {

  const [gradient, setGradient] = useState({
    start: 'rgba(255, 255, 255, 0.8)',
    end: 'rgba(0, 0, 255, 0.8)'
  });

  useEffect(() => {

    const updateGradient = (e) => {

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      setGradient({

        start: `rgba(255, 255, 255, ${1 - Math.max(x, y)})`,
        end: `rgba(0, 0, 255, ${Math.max(x, y)})`

      });
    };

    window.addEventListener('mousemove', updateGradient);

    return () => {

      window.removeEventListener('mousemove', updateGradient);

    };

  }, []);

  const backgroundStyle = {
    background: `linear-gradient(to right, ${gradient.start}, ${gradient.end})`,
    transition: 'background 1s ease' 
  };

  return (  

<>  
    <Router>
    <div className='buttons_Menu'>
    <Link to="/"><button 
    className='button_StartMenu'>Home</button></Link>
    <Link to="/InvoiceListPage"><button 
    className='button_StartMenu'>Invoices List</button></Link> 
    <Link to="/CreditNotePage"><button 
    className='button_StartMenu'>Credit_Note List</button></Link> 
    <Link to="/NewsPage"><button 
    className='button_StartMenu'>News</button></Link>
    <Link to="/CreateInvoicePage"><button 
    className='button_StartMenu'>Create Invoice</button></Link>
    </div>
    <div className="App" style={backgroundStyle}>
    <Routes>
        <Route path="/InvoiceListPage" 
        element={<InvoiceListPage />} />   
         <Route path="/CreditNotePage" 
        element={<CreditNotePage />} />   
        <Route path='/NewsPage' 
        element={<NewsPage />}></Route>
        <Route path='/CreateInvoicePage' 
        element={<CreateInvoicePage />}></Route>
    </Routes>

    <div className='mainContainer'>

   <h1 className='mainNameCompany'>Frista</h1>
   <h2 className='aplicationName'>Pay Sprint</h2>
    </div>
    </div>
    </Router>
</>
)
}

export default App;