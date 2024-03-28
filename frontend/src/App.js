import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';
import CreateEventForm from './components/CreateEventForm';

function App() {
  return (
    <BrowserRouter>
  
      <Routes>

        <Route path="/" index element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />        
        
      </Routes>
        
    </BrowserRouter>
  );
}


export default App;
