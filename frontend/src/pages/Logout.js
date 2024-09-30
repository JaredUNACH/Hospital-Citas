import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "https://hospital-citas.onrender.com";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;