import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';
import CreateEventForm from './components/CreateEventForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/create" index element={<CreateAccountPage />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;
