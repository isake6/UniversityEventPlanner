import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';
import AdminAccountPage from './pages/adminPage';
import SuperAdminAccountPage from './pages/superAdminPage';
import CreateEventForm from './components/CreateEventForm';
import List from './components/EventListing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />
        <Route path="/createEvent" element={<CreateEventForm />} />
        <Route path="/home" element={<List />} />
        <Route path="/admin" element={<AdminAccountPage/>} />
        <Route path="/super" element={<SuperAdminAccountPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
