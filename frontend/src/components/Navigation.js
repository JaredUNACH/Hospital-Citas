import React from 'react';
import logo from "../images/Medical Care.svg"; // Asegúrate de ajustar la ruta al logo
const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="icon">
              <img className="large-logo" src={logo} alt="Large Logo" />
              <img className="small-logo" src={logo} alt="Small Logo" />
            </span>
          </a>
        </li>
        <li className="hovered">
          <a href="#">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="title">Inicio</span>
            <i className="fas fa-chevron-down inicio-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="card-outline"></ion-icon>
            </span>
            <span className="title">Mis Citas</span>
            <i className="fas fa-chevron-down adm-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span className="title">Usuario
              
            </span>
            <i className="fas fa-chevron-down usuario-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="card-outline"></ion-icon>
            </span>
            <span className="title">Historial</span>
            <i className="fas fa-chevron-down adm-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="pie-chart-outline"></ion-icon>
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