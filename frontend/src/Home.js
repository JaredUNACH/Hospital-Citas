import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted playsInline>
        <source src="/instalaciones Hospital.mp4" type="video/mp4" />
      </video>
      <nav className="navbar">
        <img className="logo" src="/logo192.png" alt="Hospital Logo" />
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
        <h1>Encuentra tu especialista y pide cita </h1>
        <div>
          <button type="button">Explorar</button>
        </div>
      </div>
    </div>
  );
};

export default Home;