import {useNavigate} from 'react-router-dom';

export const Nav = ({ onLogout }) => {

    const navigate = useNavigate();
  
    return (
      <nav>
        <div className="buttons_Menu" role="group">
          <button type="button" className="button_StartMenu" onClick={() => navigate('/HomePage')}>Home</button>
          <button type="button" className="button_StartMenu" onClick={() => navigate('/NewsPage')}>News</button>
          <button type="button" className="button_StartMenu" onClick={() => navigate('/InvoiceListPage')}>Invoice List</button>
          <button type="button" className="button_StartMenu" onClick={() => navigate('/CreditNoteListPage')}>Credit Note List</button>
          <button type="button" className="button_StartMenu" onClick={() => navigate('/CreateInvoicePage')}>Create Invoice</button>
          <button type="button" className="button_StartMenu" onClick={onLogout}>Logout</button>
        </div>
      </nav>
    );
  };