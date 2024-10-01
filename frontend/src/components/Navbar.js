import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar Link
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
      <Link to="/" className="nav__brand">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul className={active}>
        <li className="nav__item">
          <Link to="/appointments" className="nav__link">
            Mis citas
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/account-patient" className="nav__link">
            Cuenta
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/login" className="nav__link" onClick={handleLogout}>
            Cerrar sesión
          </Link>
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