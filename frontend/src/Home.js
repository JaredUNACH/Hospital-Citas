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
        <ul>
          <li><a href="/appointments">Mis Citas</a></li>
          <li><a href="/account">Mi Cuenta</a></li>
          <li><a href="/logout">Cerrar Sesión</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Bienvenido al Dashboard</h1>
        <div>
          <button type="button">Explorar</button>
        </div>
      </div>
    </div>
  );
};

export default Home;