import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import SpecialtySelect from '../components/SpecialtySelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar'; // Importa el nuevo componente Navbar
import { CSSTransition } from 'react-transition-group';
import Chatbot from '../components/Chatbot'; // Importa el componente Chatbot

const Home = () => {
  const navigate = useNavigate();
  const [inTransition, setInTransition] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    setInTransition(true);
    setTimeout(() => {
      navigate(path);
    }, 500); // Tiempo de la transición en ms
  };

  const handleSearchClick = () => {
    navigate('/appointment', { state: { specialty: selectedSpecialty.value } }); // Redirige a la página para agendar citas con la especialidad seleccionada
  };

  return (
    <CSSTransition
      in={!inTransition}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="banner">
        <video autoPlay loop muted playsInline>
          <source src="/instalaciones Hospital.mp4" type="video/mp4" />
        </video>
        <Navbar onNavigate={handleNavigation} /> {/* Pasa la función handleNavigation al Navbar */}
        <div className="content">
          <div className="typewriter">
            <h1>Encuentra tu especialista y pide cita </h1>
          </div>
          <div>
            <SpecialtySelect onChange={(option) => setSelectedSpecialty(option)} />
          </div>
          <div>
            <button type="button" className="search-button" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} /> Buscar
            </button>
          </div>
        </div>
        <Chatbot /> {/* Agrega el componente Chatbot */}
      </div>
    </CSSTransition>
  );
};

export default Home;