import 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import AppointmentPage from './AppointmentPage'; // Import AppointmentPage component
import HomePage from './HomePage'
import { CssBaseline } from '@mui/material'
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx";

function App() {
  return (
    <>
    <CssBaseline />
    <Router> {/* Wrap your routes inside Router */}
      <Routes> {/* Use Routes to define your app's routes */}
        {/* Define your routes here */}
        <Route index element={<HomePage />} /> {/* homepage route */}
        <Route path="/RegisterPage" element={<RegisterPage />} /> {/* RegisterPage route */}
        <Route path="/LoginPage" element={<LoginPage />} /> {/* LoginPage route */}
        <Route path="/AppointmentPage" element={<AppointmentPage />} /> {/* AppointmentPage route */}
      </Routes>
    </Router>
    </>
  );
}

export default App;