import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Logout from './pages/Logout';
import AccountPatient from './pages/AccountPatient';
import './App.css'; // Importa los estilos CSS para App

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />
      </div>
    </Router>
  );
}

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/account-patient" element={<AccountPatient />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default App;