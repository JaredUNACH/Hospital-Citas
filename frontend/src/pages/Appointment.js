import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Appointment.css';
import FormAgenda from '../components/Form-Agenda'; // Importa el componente FormAgenda
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar'; // Importa el nuevo componente Navbar

import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inTransition, setInTransition] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const specialty = location.state?.specialty || '';
      try {
        const response = await axios.get(`http://127.0.0.1:5000/doctors?specialty=${specialty}`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [location.state]);

  const handleNavigation = (path) => {
    setInTransition(true);
    setTimeout(() => {
      navigate(path);
    }, 500); // Tiempo de la transición en ms
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
          <source src="/" type="video/mp4" />
        </video>
        <Navbar onNavigate={handleNavigation} /> {/* Pasa la función handleNavigation al Navbar */}
        <div className="content-Appointment">
          <div className="typewriter-A">
            <h2>Agenta tu cita!</h2>
          </div>
          <div className='Agenda-contendor'>
            <FormAgenda doctors={doctors} />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Appointment;