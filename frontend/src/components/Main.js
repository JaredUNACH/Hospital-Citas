import React from 'react';

const Main = () => {
  return (
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
                <img className="profile-picture" src="img/beneficiarios.svg" alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Beneficiarios</h2>
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
                <img className="profile-picture" src="img/bajas.svg" alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Bajas</h2>
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
                <img className="profile-picture" src="img/prejubilado.svg" alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Prejubilado</h2>
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