import React from 'react';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="icon">
              <img className="large-logo" src="img/Logo fabes blanco.png" alt="Large Logo" />
              <img className="small-logo" src="img/Icono fabes blanco.png" alt="Small Logo" />
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
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span className="title">Usuario</span>
            <i className="fas fa-chevron-down usuario-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="card-outline"></ion-icon>
            </span>
            <span className="title">Adm Créditos</span>
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
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="logo-usd"></ion-icon>
            </span>
            <span className="title">Prestamos</span>
            <i className="fas fa-chevron-down prestamos-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="folder-outline"></ion-icon>
            </span>
            <span className="title">Administración</span>
            <i className="fas fa-chevron-down administracion-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </span>
            <span className="title">Mobile</span>
            <i className="fas fa-chevron-down mobile-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span className="title">Configuración</span>
            <i className="fas fa-chevron-down confi-icon"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span className="title">Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;