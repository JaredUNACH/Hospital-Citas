import React, { useState } from 'react';
import logo from "../images/Medical Care.svg"; // Asegúrate de ajustar la ruta al logo
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendarAlt, faUsers, faHistory, faChartPie } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navigation.css';
import './EffectsAccount'; // Importamos el archivo de efectos de cuenta

const Navigation = ({ setContent }) => {
  const [activeItem, setActiveItem] = useState('main'); // Estado para controlar el elemento activo

  const handleItemClick = (item) => {
    setActiveItem(item);
    setContent(item);
  };

  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="icon-logo">
              <img className="large-logo" src={logo} alt="Large Logo" />
              <img className="small-logo" src={logo} alt="Small Logo" />
            </span>
          </a>
        </li>
        <li className={activeItem === 'main' ? 'hovered' : ''}>
          <a href="#" onClick={() => handleItemClick('main')}>
            <span className="icon">
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <span className="title">Inicio</span>
            <i className="fas fa-chevron-down inicio-icon"></i>
          </a>
        </li>
        <li className={activeItem === 'appointments' ? 'hovered' : ''}>
          <a href="#" onClick={() => handleItemClick('appointments')}>
            <span className="icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
            <span className="title">Mis Citas</span>
            <i className="fas fa-chevron-down adm-icon"></i>
          </a>
        </li>
        <li className={activeItem === 'account' ? 'hovered' : ''}>
          <a href="#" onClick={() => handleItemClick('account')}>
            <span className="icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <span className="title">Mi Cuenta</span>
            <i className="fas fa-chevron-down usuario-icon"></i>
          </a>
        </li>
        <li className={activeItem === 'history' ? 'hovered' : ''}>
          <a href="#" onClick={() => handleItemClick('history')}>
            <span className="icon">
              <FontAwesomeIcon icon={faHistory} />
            </span>
            <span className="title">Historial</span>
            <i className="fas fa-chevron-down adm-icon"></i>
          </a>
        </li>
        <li className={activeItem === 'reports' ? 'hovered' : ''}>
          <a href="#" onClick={() => handleItemClick('reports')}>
            <span className="icon">
              <FontAwesomeIcon icon={faChartPie} />
            </span>
            <span className="title">Reportes</span>
            <i className="fas fa-chevron-down reportes-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;