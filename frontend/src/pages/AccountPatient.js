import React from 'react';
import '../styles/AccountPatient.css';
import EffectsAccount from '../components/EffectsAccount';
import Navigation from '../components/Navigation';
import Main from '../components/Main';

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