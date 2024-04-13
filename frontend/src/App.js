import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';
import CreateEventForm from './components/CreateEventForm';
import Navbar from './components/Navbar';
import List from './components/EventListing';
import AdminPage from './pages/adminPage';
import EventDetail from './components/EventDetail';
import RSOForm from './components/RSOForm';
import JoinRSOSelection from './components/JoinRsoListing';
import MyRSOSelection from './components/MyRsoListing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />
        <Route path="/createEvent" element={<CreateEventForm />} />
        <Route path="/home" element={<List />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/registerRSO" element={<RSOForm />} />
        <Route path="/joinRSO" element={<JoinRSOSelection />} />
        <Route path="/myRSO" element={<MyRSOSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
