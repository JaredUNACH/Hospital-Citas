import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (loginData) => {
    const response = await axios.post('http://127.0.0.1:5000/login', loginData, { withCredentials: true });
    setUser(response.data.user);
  };

  const googleLogin = async (credential) => {
    const response = await axios.post('http://127.0.0.1:5000/google-login', { credential }, { withCredentials: true });
    setUser(response.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};