import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassord.css'; // Importa los estilos CSS para ForgotPassword
import config from '../config'; // Importa la configuración
import BotonRegresar from '../components/boton-regresar'; // Importa el componente BotonRegresar

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Estado para manejar los pasos del proceso
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiBaseUrl}/forgot-password`, { email });
      Swal.fire({
        icon: 'success',
        title: 'Código de verificación enviado',
        text: 'Revisa tu correo electrónico para obtener el código de verificación.',
      });
      setStep(2); // Avanza al siguiente paso
    } catch (error) {
      console.error('Error enviando el código de verificación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el código de verificación. Por favor, intenta de nuevo.',
      });
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiBaseUrl}/verify-code`, { email, verificationCode });
      Swal.fire({
        icon: 'success',
        title: 'Código verificado',
        text: 'El código de verificación es correcto. Ahora puedes cambiar tu contraseña.',
      });
      setStep(3); // Avanza al siguiente paso
    } catch (error) {
      console.error('Error verificando el código:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El código de verificación es incorrecto. Por favor, intenta de nuevo.',
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseñas no coinciden',
        text: 'Por favor, asegúrate de que las contraseñas coincidan.',
      });
      return;
    }
    try {
      await axios.post(`${config.apiBaseUrl}/reset-password`, { email, newPassword });
      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada',
        text: 'Tu contraseña ha sido cambiada exitosamente.',
      });
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error cambiando la contraseña:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cambiar la contraseña. Por favor, intenta de nuevo.',
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <BotonRegresar />
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="forgot-password-form">
          <div className="bubble bubble-email">Ingresa tu correo electrónico para recibir un código de verificación.</div>
          <h2>Recuperar Contraseña</h2>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar Código</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerificationSubmit} className="forgot-password-form">
          <div className="bubble bubble-code">Ingresa el código de verificación que recibiste en tu correo.</div>
          <h2>Verificar Código</h2>
          <input
            type="text"
            name="verificationCode"
            placeholder="Código de Verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verificar</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit} className="forgot-password-form">
          <div className="bubble bubble-password">Ingresa tu nueva contraseña y confírmala.</div>
          <h2>Cambiar Contraseña</h2>
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Nueva Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Cambiar Contraseña</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;