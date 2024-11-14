import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { CSSTransition } from 'react-transition-group';
import useLoginScript from '../components/useLoginScript'; 
import LoginMovil from '../components/LoginMovil'; // Importa el componente móvil
import '../styles/Login.css';
import '../styles/Transitions.css'; // Importa los estilos de transición
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import config from '../config'; // Importa la configuración API

const clientId = "577245318494-v9611dklsktb7gn5re00kce0msqh06l4.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const isSignUp = useLoginScript(); // hook para manejar la animación

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [inTransition, setInTransition] = useState(false); // Estado para manejar la transición
  const [animate, setAnimate] = useState(false); // Estado para manejar la animación

  useEffect(() => {
    if (inTransition) {
      setAnimate(true);
    }
  }, [inTransition]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(loginData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, loginData, { withCredentials: true });
      console.log('Login response:', response.data); // Verifica la respuesta del servidor
      const token = response.data.access_token;
      const userId = response.data.user_id; // Obtener el ID del usuario de la respuesta
      if (token && token.length > 9) {
        localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
        localStorage.setItem('user_id', userId); // Guarda el ID del usuario en el almacenamiento local
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { rol } = decodedToken.sub; // Asegúrate de acceder correctamente al rol
        console.log('Decoded token:', decodedToken); // Verifica el contenido del token decodificado

        // Enviar correo de notificación de inicio de sesión
        await axios.post(`${config.apiBaseUrl}/send-login-notification-email`, { user_id: userId, role: rol }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
          icon: 'success',
          timer: 3000,
        }).then(() => {
          setInTransition(true); // Inicia la transición
          setTimeout(() => {
            if (rol === 'administrador' || rol === 'medico') {
              navigate('/account-patient'); // Redirige a AccountPatient si el usuario es un administrador o doctor
            } else {
              navigate('/home'); // Redirige al home si el usuario es un paciente
            }
          }, 1000); // Aumenta el tiempo de espera a 1000ms
        });
      } else {
        console.error('Token inválido:', token);
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: 'Por favor, verifica tus credenciales.',
        timer: 3000,
      });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(registerData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }
    try {
      const response = await axios.post(`${config.apiBaseUrl}/register`, registerData, { withCredentials: true });
      console.log('Register response:', response.data); // Verifica la respuesta del servidor
      const token = response.data.access_token;
      const userId = response.data.user_id; // Obtener el ID del usuario de la respuesta
      if (token && token.length > 9) {
        localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
        localStorage.setItem('user_id', userId); // Guarda el ID del usuario en el almacenamiento local
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { rol } = decodedToken.sub; // Asegúrate de acceder correctamente al rol

        // Enviar correo de bienvenida
        await axios.post(`${config.apiBaseUrl}/send-welcome-email`, { paciente_id: userId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire({
          title: 'Registro exitoso',
          text: 'Bienvenido!',
          icon: 'success',
          timer: 3000,
        }).then(() => {
          setInTransition(true); // Inicia la transición
          setTimeout(() => {
            if (rol === 'administrador' || rol === 'medico') {
              navigate('/account-patient'); // Redirige a AccountPatient si el usuario es un administrador o doctor
            } else {
              navigate('/home'); // Redirige al home si el usuario es un paciente
            }
          }, 1000); // Aumenta el tiempo de espera a 1000ms
        });
      } else {
        console.error('Token inválido:', token);
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Por favor, verifica tus datos.',
        timer: 3000,
      });
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const loginResponse = await axios.post(`${config.apiBaseUrl}/google-login`, { credential }, { withCredentials: true });
      console.log('Google login response:', loginResponse.data); // Verifica la respuesta del servidor
      const token = loginResponse.data.access_token;
      const userId = loginResponse.data.user_id; // Obtener el ID del usuario de la respuesta
      if (token && token.length > 9) {
        localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
        localStorage.setItem('user_id', userId); // Guarda el ID del usuario en el almacenamiento local
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { rol } = decodedToken.sub; // Asegúrate de acceder correctamente al rol

        // Enviar correo de notificación de inicio de sesión
        await axios.post(`${config.apiBaseUrl}/send-login-notification-email`, { user_id: userId, role: rol }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
          icon: 'success',
          timer: 3000,
        }).then(() => {
          setInTransition(true); // Inicia la transición
          setTimeout(() => {
            if (rol === 'administrador' || rol === 'medico') {
              navigate('/account-patient'); // Redirige a AccountPatient si el usuario es un administrador o doctor
            } else {
              navigate('/home'); // Redirige al home si el usuario es un paciente
            }
          }, 1000); // Aumenta el tiempo de espera a 1000ms
        });
      } else {
        console.error('Token inválido:', token);
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: 'Por favor, verifica tus credenciales.',
        timer: 3000,
      });
    }
  };

  const handleGoogleRegisterSuccess = async (response) => {
    try {
      const { credential } = response;
      const registerResponse = await axios.post(`${config.apiBaseUrl}/google-register`, { credential }, { withCredentials: true });
      console.log('Google register response:', registerResponse.data); // Verifica la respuesta del servidor
      const token = registerResponse.data.access_token;
      const userId = registerResponse.data.user_id; // Obtener el ID del usuario de la respuesta
      if (token && token.length > 9) {
        localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
        localStorage.setItem('user_id', userId); // Guarda el ID del usuario en el almacenamiento local
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { rol } = decodedToken.sub; // Asegúrate de acceder correctamente al rol

        // Enviar correo de bienvenida
        await axios.post(`${config.apiBaseUrl}/send-welcome-email`, { paciente_id: userId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire({
          title: 'Registro exitoso',
          text: 'Bienvenido!',
          icon: 'success',
          timer: 3000,
        }).then(() => {
          setInTransition(true); // Inicia la transición
          setTimeout(() => {
            if (rol === 'administrador' || rol === 'medico') {
              navigate('/account-patient'); // Redirige a AccountPatient si el usuario es un administrador o doctor
            } else {
              navigate('/home'); // Redirige al home si el usuario es un paciente
            }
          }, 1000); // Aumenta el tiempo de espera a 1000ms
        });
      } else {
        console.error('Token inválido:', token);
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error('Error en el registro con Google:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Por favor, verifica tus datos.',
        timer: 3000,
      });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error en el inicio de sesión',
      text: 'No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.',
      timer: 3000,
    });
  };

  return (
    <>
      <div className="desktop-view">
        <GoogleOAuthProvider clientId={clientId}>
          <CSSTransition
            in={!inTransition}
            timeout={1000}
            classNames="fade"
            unmountOnExit
          >
            <div className={`container-principal ${animate ? (inTransition ? 'fade-exit-active' : 'fade-enter-active') : ''}`}>
              <h2 className={`bounce ${animate ? (inTransition ? 'fade-exit-active' : 'fade-enter-active') : ''}`}>Bienvenido al Hospital-Citas</h2>
              <div className="container-login" id="container-login">
                <div className={`form-container sign-up-container ${animate ? (inTransition ? 'slide-out' : 'slide-in') : ''}`}>
                  <form onSubmit={handleRegisterSubmit} className={`${animate ? (inTransition ? 'rotate-out' : 'rotate-in') : ''}`}>
                    <h1>Crear Cuenta</h1>
                    <GoogleLogin
                      onSuccess={handleGoogleRegisterSuccess}
                      onError={handleGoogleFailure}
                      useOneTap
                    />
                    <span>o usa tu correo electrónico para registrarte</span>
                    <input type="text" name="name" placeholder="Nombre" onChange={handleRegisterChange} />
                    <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleRegisterChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleRegisterChange} />
                    <button type="submit" className="pulse">Registrarse</button>
                  </form>
                </div>
                <div className={`form-container sign-in-container ${animate ? (inTransition ? 'slide-out' : 'slide-in') : ''}`}>
                  <form onSubmit={handleLoginSubmit} className={`${animate ? (inTransition ? 'rotate-out' : 'rotate-in') : ''}`}>
                    <h1>Iniciar Sesión</h1>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleFailure}
                      useOneTap
                    />
                    <span>o usa tu cuenta</span>
                    <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleLoginChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleLoginChange} />
                    <a href="#">¿Olvidaste tu contraseña?</a>
                    <button type="submit" className="pulse">Iniciar Sesión</button>
                  </form>
                </div>
                <div className="overlay-container">
                  <div className="overlay">
                    <div className={`overlay-panel overlay-left ${animate ? (inTransition ? 'slide-out' : 'slide-in') : ''}`}>
                      <h1>¡Bienvenido de Nuevo!</h1>
                      <p>Para agendar tu cita, por favor inicia sesión con tu información personal</p>
                      <button className="ghost" id="signIn">Iniciar Sesión</button>
                    </div>
                    <div className={`overlay-panel overlay-right ${animate ? (inTransition ? 'slide-out' : 'slide-in') : ''}`}>
                      <h1>¡Hola, Amigo!</h1>
                      <p>Ingresa tus datos personales y agenda tu cita con nosotros</p>
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
          </CSSTransition>
        </GoogleOAuthProvider>
      </div>
      <div className="mobile-view">
        <LoginMovil
          clientId={clientId}
          handleGoogleLoginSuccess={handleGoogleLoginSuccess}
          handleGoogleFailure={handleGoogleFailure}
          handleLoginSubmit={handleLoginSubmit}
          handleLoginChange={handleLoginChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleRegisterChange={handleRegisterChange}
        />
      </div>
    </>
  );
};

export default Login;