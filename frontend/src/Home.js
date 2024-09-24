import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import SpecialtySelect from './SpecialtySelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
      <nav className="navbar">
        <img className="logo" src="/Medical Care.svg" alt="Hospital Logo" />
        <ul className="nav-links">
          <li><a href="/appointments">Mis Citas</a></li>
          <li><a href="/account">Mi Cuenta</a></li>
          <li><a href="/logout">Cerrar Sesión</a></li>
        </ul>
        <label className="popup">
          <input type="checkbox" />
          <div className="burger" tabIndex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="popup-window">
            <ul>
              <li><a href="/appointments">Mis Citas</a></li>
              <li><a href="/account">Mi Cuenta</a></li>
              <li><a href="/logout">Cerrar Sesión</a></li>
            </ul>
          </nav>
        </label>
      </nav>
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