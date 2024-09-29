import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import "../styles/Navbar.css";
import logo from "../images/Medical Care.svg"; // Asegúrate de ajustar la ruta al logo

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navigate = useNavigate(); // Cambiado a useNavigate

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const handleLogout = () => {
    // Eliminar el token de sesión
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login"); // Cambiado a navigate
  };

  return (
    <nav className="nav">
      <button className="nav__brand" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="logo" />
      </button>
      <ul className={active}>
        <li className="nav__item">
          <button className="nav__link" onClick={() => navigate('/appointments')}>
            Mis citas
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__link" onClick={() => navigate('/account')}>
            Cuenta
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__link" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;