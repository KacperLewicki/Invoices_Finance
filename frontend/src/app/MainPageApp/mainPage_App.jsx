import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./mainPage_App.css";
import { Nav } from '../Nav/nav';
import HomePage from "../../pages/Home/homePage";
import Signup from '../../pages/Registration/signup';
import Login from '../../pages/Login/login';
import NewsPage from '../../pages/NewsPage/newsPage';
import CreateInvoicePage from '../../pages/CreateInvoicePage/CreateInvoicePage';
import CreditNoteListPage from '../../pages/CreditNotePage/creditNotePage';
import InvoiceListPage from '../../pages/InvoicesPage/invoicesPage';
import React, {useEffect} from 'react';

const MainApp = ({ isLoggedIn, onLogin, onLogout, }) => {

  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoggedIn && (window.location.pathname !== '/' && window.location.pathname !== '/Signup')) {

      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (

  <>

      {isLoggedIn && <Nav onLogout={onLogout} />}

        <Routes>
          <Route path="/" element={<Login onLogin={onLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/NewsPage" element={<NewsPage />} />
          <Route path="/CreateInvoicePage" element={<CreateInvoicePage />} />
          <Route path="/CreditNoteListPage" element={<CreditNoteListPage />} />
          <Route path="/InvoiceListPage" element={<InvoiceListPage />} />
        </Routes>

  
    </>
  );
};

export default MainApp;