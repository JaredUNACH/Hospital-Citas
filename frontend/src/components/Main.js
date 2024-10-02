import React from 'react';
import MisCitas from '../images/MisCitas.png'
import HistorialMedico from '../images/HistorialMedico.png'
import CongifCuenta from '../images/CuentaConfiguracion.png'
import Reportes from '../images/Reportes.png'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Main = () => {
  return (
    <div className="main">
      <div className="topbar">
        <div className="toggle">
          <FontAwesomeIcon icon={faBars} />
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
                <img className="profile-picture" src={MisCitas} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Mis Citas</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => window.location.href='detalle-empleo.html'}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => window.location.href='editar-empleo.html'}>
                    Editar
                  </button>
                </div>
              </div>
            </div>

            <div className="card-beneficiarios">
              <div className="profile-container">
                <img className="profile-picture" src={HistorialMedico} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Historial Medico</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => window.location.href='detalle-beneficiario.html'}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => window.location.href='editar-beneficiario.html'}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
            <div className="card-bajas">
              <div className="profile-container">
                <img className="profile-picture" src={CongifCuenta} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Configuracion de la cuenta</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => window.location.href='detalle-bajas.html'}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => window.location.href='editar-bajas.html'}>
                    Editar
                  </button>
                </div>
              </div>
            </div>

            <div className="card-prejubilado">
              <div className="profile-container">
                <img className="profile-picture" src={Reportes} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Reportes</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => window.location.href='detalle-prejubilado.html'}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => window.location.href='editar-prejubilado.html'}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recentCustomers">
          <div className="profile-container">
            <img src="img/Foto-perfil.png" alt="Foto de perfil" className="profile-pic" />
            <div className="button-container">
              <button className="eye-button" onClick={() => window.location.href='detalle-datos1.html'}>
                <i className="fas fa-eye"></i>
              </button>
              <button className="edit-button" onClick={() => window.location.href='editar-datos1.html'}>
                Editar
              </button>
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
  );
};

export default Main;