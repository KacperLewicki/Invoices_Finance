import React, {useState, useEffect} from 'react';
import NewsPage from '../../pages/NewsPage/newsPage';
import InvoiceListPage  from '../../pages/InvoicesPage/invoicesPage';
import CreditNoteListPage  from '../../pages/CreditNotePage/creditNotePage';
import CreateInvoicePage from '../../pages/CreateInvoicePage/CreateInvoicePage';
import "./homePage.css"

const HomePage = () => {

    const [activePage, setActivePage] = useState();

    const News = () => {

        setActivePage([<div style={backgroundStyle} className='App'><NewsPage /></div>])

    }

    const InvoiceList = () => {

        setActivePage([<div style={backgroundStyle} className='App'><InvoiceListPage /></div>])

    }

    const CreditNoteList = () => {
        
        setActivePage([<div style={backgroundStyle} className='App'><CreditNoteListPage /></div>])
    }

    const CreateInvoice = () => {
        
        setActivePage([<div style={backgroundStyle} className='App'><CreateInvoicePage /></div>])
    }


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



return(

<>
    <nav>
        <div className='buttons_Menu' role='group'>
            <button type='button' className='button_StartMenu' onClick={News}>News</button>
            <button type='button' className='button_StartMenu' onClick={InvoiceList}>Invoice List</button>
            <button type='button' className='button_StartMenu' onClick={CreditNoteList}>Credit Note List</button>
            <button type='button' className='button_StartMenu' onClick={CreateInvoice}>Create Invoice</button>
        </div>
    </nav>
    <div>
        {activePage ? activePage : (
          
            <div className='homepageContent' >
                <h1>Welcome to Nest Bank</h1>
                <p className='description'>
                    Pay Sprint is your ultimate invoicing solution, 
                    designed to make managing your finances easier and more efficient. 
                    Our app is continuously evolving, bringing you the best tools to 
                    streamline your invoicing process.
                </p>
                <p className='description'>
                    Features of Pay Sprint include:
                    <ul>
                        <li>Easy invoice creation and management</li>
                        <li>Detailed credit note handling</li>
                        <li>Real-time updates and notifications</li>
                        <li>Secure data storage and backup</li>
                        <li>User-friendly interface and customization options</li>
                    </ul>
                </p>
                <blockquote className='quote'>
                    "The best way to predict the future is to create it." - Peter Drucker
                </blockquote>
            </div>
         
        )}
    </div>
</>


)


}

export default HomePage;