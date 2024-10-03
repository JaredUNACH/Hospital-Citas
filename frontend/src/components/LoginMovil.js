import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/LoginMovil.css';

const LoginMovil = ({ clientId, handleGoogleLoginSuccess, handleGoogleFailure, handleLoginSubmit, handleLoginChange, handleRegisterSubmit, handleRegisterChange }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
        <div className="container-principal-movil">
            <div className={`container-login-movil ${isLogin ? 'login-view' : 'register-view'}`}>
            <form onSubmit={handleLoginSubmit}>
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
                <div className="register-link">
                <p>¿No tienes una cuenta? <a href="#" onClick={toggleView}>Regístrate</a></p>
                </div>
            </form>
            <form onSubmit={handleRegisterSubmit}>
                <h1>Registrarse</h1>
                <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleFailure}
                useOneTap
                />
                <span>o usa tu correo electrónico para registrarte</span>
                <input type="text" name="name" placeholder="Nombre" onChange={handleRegisterChange} />
                <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleRegisterChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleRegisterChange} />
                <button type="submit" className="pulse">Registrarse</button>
                <div className="register-link">
                <p>¿Ya tienes una cuenta? <a href="#" onClick={toggleView}>Inicia Sesión</a></p>
                </div>
            </form>
            </div>
        </div>
    </GoogleOAuthProvider>
  );
};

export default LoginMovil;