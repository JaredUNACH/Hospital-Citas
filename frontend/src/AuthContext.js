// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/check-auth', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (loginData) => {
    const response = await axios.post('http://127.0.0.1:5000/login', loginData, { withCredentials: true });
    setUser(response.data.user);
  };

  const googleLogin = async (tokenId) => {
    const response = await axios.post('http://127.0.0.1:5000/google-login', { tokenId }, { withCredentials: true });
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};