import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useLoginScript from './useLoginScript'; // Asegúrate de que la ruta sea correcta
import './Login.css';

const clientId = "312226628197-vuug8kd54rhent80sea8naghsj50crd4.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const isSignUp = useLoginScript(); // Usa el hook para manejar la animación

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', loginData);
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
        });
        navigate('/home'); // Redirigir al usuario al dashboard o a la página principal
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: 'Por favor, verifica tus credenciales.',
      });
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('http://127.0.0.1:5000/google-login', { tokenId: credential });
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
        });
        navigate('/home'); // Redirigir al usuario al dashboard o a la página principal
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: 'Por favor, verifica tus credenciales.',
      });
    }
  };

  const handleGoogleRegisterSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('http://127.0.0.1:5000/google-register', { tokenId: credential });
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Bienvenido!',
        });
        navigate('/home'); // Redirigir al usuario al dashboard o a la página principal
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Por favor, verifica tus credenciales.',
      });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error en el inicio de sesión',
      text: 'No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.',
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Bienvenido al Hospital-Citas</h2>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Crear Cuenta</h1>
              <GoogleLogin
                onSuccess={handleGoogleRegisterSuccess}
                onError={handleGoogleFailure}
              />
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
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleFailure}
              />
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
    </GoogleOAuthProvider>
  );
};

export default Login;