import React, {useState} from 'react'
import { BrowserRouter as  Router} from 'react-router-dom';
import MainApp from './MainPageApp/mainPage_App';

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

          <MainApp isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
        
      </Router>
    );
};

export default App;