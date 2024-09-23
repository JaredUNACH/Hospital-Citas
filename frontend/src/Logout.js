import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  }, [navigate]);

  return null;
};

export default Logout;