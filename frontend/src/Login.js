import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css';
import useLoginScript from './useLoginScript';
import Button from './SocialButtons'; // Importamos el componente de botones sociales

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
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
        });
        // Redirigir al usuario al dashboard o a la página principal
      }
    } catch (error) {
        console.error(error);
        // Manejar el error del inicio de sesión
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: 'Por favor, verifica tus credenciales.',
        });
      }
    };
  return (
    <div>
      <h2>Bienvenido al Hospital-Citas</h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Crear Cuenta</h1>
            <Button/>{/* Botones de redes sociales */}
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
            <Button/>{/* Botones de redes sociales */}
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