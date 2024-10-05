import React from 'react';
import EffectsAccount from '../components/EffectsAccount';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import { Link } from 'react-router-dom';
import '../styles/AccountPatient.css';

const AccountPatient = () => {
  return (
    <div className="container">
      <Navigation />
      <Main />
      <EffectsAccount />
      <Link to="/logout">Cerrar sesión</Link> {/* Enlace para cerrar sesión */}
    </div>
  );
};

export default AccountPatient;