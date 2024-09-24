import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  }, [navigate]);

  return null;
};

export default Logout;