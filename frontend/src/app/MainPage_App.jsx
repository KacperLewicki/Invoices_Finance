import { BrowserRouter as  Router,Routes, Route, useNavigate } from 'react-router-dom';
import "./MainPage_App.css";
import HomePage from "../pages/Home/homePage";
import Signup from '../pages/Registration/signup';
import Login from '../pages/Login/login';
import NewsPage from '../pages/NewsPage/newsPage';
import CreateInvoicePage from '../pages/CreateInvoicePage/CreateInvoicePage';
import CreditNoteListPage from '../pages/CreditNotePage/creditNotePage';
import InvoiceListPage from '../pages/InvoicesPage/invoicesPage';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {

    return localStorage.getItem('isLoggedIn') === 'true';
  });
  

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div>
        <MainApp isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
    </Router>
  );
};

const MainApp = ({ isLoggedIn, onLogin, onLogout }) => {

  const navigate = useNavigate();

  const [gradient, setGradient] = useState({
    start: 'rgba(255, 255, 255, 0.8)',
    end: 'rgba(0, 0, 255, 0.8)'
  });

  useEffect(() => {
    const updateGradient = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradient({
        start: `rgba(194, 86, 236, ${1 - Math.max(x, y)})`,
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

  useEffect(() => {
    if (!isLoggedIn && (window.location.pathname !== '/' && window.location.pathname !== '/Signup')) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div style={backgroundStyle} className='App'>
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
      </div>
    </>
  );
};

const Nav = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="buttons_Menu" role="group">
        <button type="button" className="button_StartMenu" onClick={() => navigate('/HomePage')}>Home</button>
        <button type="button" className="button_StartMenu" onClick={() => navigate('/NewsPage')}>News</button>
        <button type="button" className="button_StartMenu" onClick={() => navigate('/InvoiceListPage')}>Invoice List</button>
        <button type="button" className="button_StartMenu" onClick={() => navigate('/CreditNoteListPage')}>Credit Note List</button>
        <button type="button" className="button_StartMenu" onClick={() => navigate('/CreateInvoicePage')}>Create Invoice</button>
        <button type="button" className="button_StartMenu" onClick={onLogout}>Wyloguj</button>
      </div>
    </nav>
  );
};

export default App;