import React from 'react';
import EffectsAccount from '../components/EffectsAccount';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import '../styles/AccountPatient.css';

const AccountPatient = () => {
  return (
    <div className="container">
      <Navigation />
      <Main />
      <EffectsAccount />
    </div>
  );
};

export default AccountPatient;