import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './pages/Login';
import Home from './pages/Home';
import Logout from './pages/Logout';
import AccountPatient from './pages/AccountPatient';
import './styles/Transitions.css'; // Importa los estilos CSS para las transiciones

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={1000}
      >
        <Routes location={location}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account-patient" element={<AccountPatient />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;