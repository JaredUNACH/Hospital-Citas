import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import useLoginScript from './useLoginScript';

const Login = () => {
  useLoginScript();

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', loginData);
      console.log(response.data);
      // Manejar el éxito del inicio de sesión
      if (response.status === 200) {
        alert('Inicio de sesión exitoso');
        // Redirigir al usuario al dashboard o a la página principal
      }
    } catch (error) {
      console.error(error);
      // Manejar el error del inicio de sesión
      alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div>
      <h2>Bienvenido al Hospital-Citas</h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Crear Cuenta</h1>
            <div className="social-container">
              <a href="https://www.facebook.com/FreeWebsiteCode/" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/freewebsitecode" className="social"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/freewebsitecode/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>o usa tu correo electrónico para registrarte</span>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Correo Electrónico" />
            <input type="password" placeholder="Contraseña" />
            <button>Registrarse</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar Sesión</h1>
            <div className="social-container">
              <a href="https://www.facebook.com/FreeWebsiteCode/" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/freewebsitecode" className="social"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/freewebsitecode/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>o usa tu cuenta</span>
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleLoginChange} />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleLoginChange} />
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Bienvenido de Nuevo!</h1>
              <p>Para mantenerte conectado con nosotros, por favor inicia sesión con tu información personal</p>
              <button className="ghost" id="signIn">Iniciar Sesión</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¡Hola, Amigo!</h1>
              <p>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
              <button className="ghost" id="signUp">Registrarse</button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Creado con <i className="fa fa-heart"></i> por
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/JaredUNACH"> Jared Salazar</a>
        </p>
      </footer>
    </div>
  );
};

export default Login;