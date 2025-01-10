import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import LoginPage from './LoginPage'; // Import LoginPage component
import AppointmentPage from './AppointmentPage'; // Import AppointmentPage component
import AppointmentPageTest from './AppointmentPageTest'
import HomePage from './HomePage'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
    <CssBaseline />
    <Router> {/* Wrap your routes inside Router */}
      <Routes> {/* Use Routes to define your app's routes */}
        {/* Define your routes here */}
        <Route index element={<HomePage />} /> {/* homepage route */}
        <Route path="/login" element={<LoginPage />} /> {/* LoginPage route */}
        <Route path="/appointment" element={<AppointmentPage />} /> {/* AppointmentPage route */}
        <Route path="/appointmenttest" element={<AppointmentPageTest />} /> {/* AppointmentPage route */}
      </Routes>
    </Router>
    </>
  );
}

export default App;