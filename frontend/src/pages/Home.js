import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import SpecialtySelect from '../components/SpecialtySelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar'; // Importa el nuevo componente Navbar
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="banner">
      <video autoPlay loop muted playsInline>
        <source src="/instalaciones Hospital.mp4" type="video/mp4" />
      </video>
      <Navbar /> {/* Agrega el nuevo componente Navbar */}
      <div className="content">
        <div className="typewriter">
          <h1>Encuentra tu especialista y pide cita </h1>
        </div>
        <div>
          <SpecialtySelect />
        </div>
        <div>
          <button type="button" className="search-button">
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;