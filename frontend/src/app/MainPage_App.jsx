import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./MainPage_App.css";
import HomePage from "../components/Home/homePage";
import Signup from '../components/Registration/signup';
import Login from '../components/Login/login';

function App() {

  return (  
  <>
    <Router>
 
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="HomePage" element={<HomePage />}/>
        <Route path="Signup" element={<Signup />}/>
    </Routes>

    </Router> 
  </>
)
}

export default App;