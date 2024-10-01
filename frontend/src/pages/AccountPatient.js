import React from 'react';
import '../styles/AccountPatient.css';

import EffectsAccount from '../components/EffectsAccount';

const AccountPatient = () => {
  return (
    <div className="container">
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

      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="nombre">
            <h2>Hola, Jhovanny</h2>
          </div>
          <div className="campana">
            <i className="fas fa-bell"></i>
            <div className="notification-dot"></div>
            <div id="notification-modal" className="modal">
              <i className="fas fa-times close"></i>
              <p>Tienes una nueva notificación</p>
              <p>Un cliente</p>
            </div>
          </div>
          <div className="user">
            <img src="img/customer01.jpg" alt="" />
          </div>
          <p className="nombre-usuario">Jhovanni Torres</p>
          <p className="titulo-usuario">Encargado</p>
        </div>
        <div className="flecha-atras">
          <i className="fa-solid fa-chevron-left fecha-back"></i>
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardBox">
              <div className="card-empleo">
                <div className="profile-container">
                  <img className="profile-picture" src="img/empleo.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Empleo</h2>
                  <div className="button-container">
                    <button className="eye-button" onClick={() => window.location.href='detalle-empleo.html'}><i className="fas fa-eye"></i></button>
                    <button className="edit-button" onClick={() => window.location.href='editar-empleo.html'}>Editar</button>
                  </div>
                </div>
              </div>

              <div className="card-beneficiarios">
                <div className="profile-container">
                  <img className="profile-picture" src="img/beneficiarios.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Beneficiarios</h2>
                  <div className="button-container">
                    <button className="eye-button" onClick={() => window.location.href='detalle-beneficiario.html'}><i className="fas fa-eye"></i></button>
                    <button className="edit-button" onClick={() => window.location.href='editar-beneficiario.html'}>Editar</button>
                  </div>
                </div>
              </div>
              <div className="card-ahorro">
                <div className="profile-container">
                  <img className="profile-picture" src="img/ahorro.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Ahorro</h2>
                  <button className="eye-button-A">
                    <i className="fas fa-eye"></i>
                    <p>Visualizar</p>
                  </button>
                </div>
              </div>
              <div className="card-bajas">
                <div className="profile-container">
                  <img className="profile-picture" src="img/bajas.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Bajas</h2>
                  <div className="button-container">
                    <button className="eye-button" onClick={() => window.location.href='detalle-bajas.html'}><i className="fas fa-eye"></i></button>
                    <button className="edit-button" onClick={() => window.location.href='editar-bajas.html'}>Editar</button>
                  </div>
                </div>
              </div>
              <div className="card-prejubilado">
                <div className="profile-container">
                  <img className="profile-picture" src="img/prejubilado.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Prejubilado</h2>
                  <div className="button-container">
                    <button className="eye-button" onClick={() => window.location.href='detalle-prejubilado.html'}><i className="fas fa-eye"></i></button>
                    <button className="edit-button" onClick={() => window.location.href='editar-prejubilado.html'}>Editar</button>
                  </div>
                </div>
              </div>
              <div className="card-prestamo">
                <div className="profile-container">
                  <img className="profile-picture" src="img/prestamos.svg" alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Prestamos</h2>
                  <button className="eye-button-A" onClick={() => window.location.href='visualizar-prestamo.html'}>
                    <i className="fas fa-eye"></i>
                    <p>Visualizar</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="profile-container">
              <img src="img/Foto-perfil.png" alt="Foto de perfil" className="profile-pic" />
              <div className="button-container">
                <button className="eye-button" onClick={() => window.location.href='detalle-datos1.html'}><i className="fas fa-eye"></i></button>
                <button className="edit-button" onClick={() => window.location.href='editar-datos1.html'}>Editar</button>
              </div>
            </div>
            <div className="info-container">
              <div className="info-item">
                <i className="fa-regular fa-user user-icon"></i>
                <div className="info-text">
                  <div className="info-titulo">
                    <p>Nombre</p>
                  </div>
                  <div className="info-nombre">
                    <p className="nombre">Juan Diego</p>
                    <p className="apellido">Pérez López</p>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-regular fa-heart corazon-icon"></i>
                <div className="info-text">
                  <div className="info-titulo">
                    <p>Estado civil</p>
                  </div>
                  <div className="info-nombre">
                    <p className="nombre">Soltero</p>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-mobile-screen movil-icon"></i>
                <div className="info-text">
                  <div className="info-titulo">
                    <p>Celular</p>
                  </div>
                  <div className="info-nombre">
                    <p className="nombre">9614734865</p>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-location-dot GPS-icon"></i>
                <div className="info-text">
                  <div className="info-titulo">
                    <p>Municipio</p>
                  </div>
                  <div className="info-nombre">
                    <p className="nombre">Tuxtla Gutierrez</p>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-map-pin pin-icon"></i>
                <div className="info-text">
                  <div className="info-titulo">
                    <p>Colonia</p>
                  </div>
                  <div className="info-nombre">
                    <p className="nombre">Casitas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EffectsAccount />
    </div>
  );
};

export default AccountPatient;