import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MisCitas from '../images/MisCitas.png';
import Monitoreo from '../images/Monitoreo.png';
import HistorialMedico from '../images/HistorialMedico.png';
import CongifCuenta from '../images/CuentaConfiguracion.png';
import Reportes from '../images/Reportes.png';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import letterImages from '../utils/letterImages'; // Importa el mapeo de imágenes
import config from '../config'; // Importa la configuración
import WikiSearch from '../components/WikiSearch'; // Importa el componente WikiSearch
import UploadHistorialMedico from '../components/UploadHistorialMedico'; // Importa el componente de subida de archivos

const Main = ({ setContent }) => {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [curp, setCurp] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [alergiaMedicamentos, setAlergiaMedicamentos] = useState('');
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [role, setRole] = useState(''); // Estado para almacenar el rol del usuario
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setIsNavActive(!isNavActive);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirige al login si no hay token
        return;
      }

      try {
        const response = await axios.get(`${config.apiBaseUrl}/user-info`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setUsername(data.name);
        setApellidoPaterno(data.apellido_paterno || '');
        setApellidoMaterno(data.apellido_materno || '');
        setCurp(data.curp || '');
        setSexo(data.sexo || '');
        setTipoSangre(data.tipo_sangre || '');
        setEmail(data.email || '');
        setTelefono(data.telefono || '');
        setFechaNacimiento(data.fecha_nacimiento || '');
        setAlergiaMedicamentos(data.alergia_medicamentos || '');
        setUserImage(data.profile_picture ? `${config.apiBaseUrl}/${data.profile_picture.replace(/\\/g, '/')}` : null);

        // Obtener la primera letra del nombre de usuario
        const firstLetter = data.name.charAt(0).toUpperCase();

        // Seleccionar la imagen adecuada basada en la primera letra
        setUserImage(data.profile_picture ? `${config.apiBaseUrl}/${data.profile_picture.replace(/\\/g, '/')}` : letterImages[firstLetter] || null); // Establecer la imagen o null si no hay coincidencia

        // Decodificar el token JWT manualmente para obtener el rol del usuario
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setRole(decodedToken.sub.rol); // Ajusta esto según la estructura de tu token
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        navigate('/login'); // Redirige al login si la solicitud falla
      }
    };
    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNavActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBackClick = () => {
    navigate('/home'); // Redirige a la página Home
  };

  const getBeneficiariosButtonContent = () => {
    switch (role) {
      case 'administrador':
        return (
          <>
            <button className="eye-button" onClick={() => setContent('user-list')}>
              <i className="fas fa-eye"></i>
            </button>
            <button className="edit-button" onClick={() => setContent('user-list')}>
              Editar
            </button>
          </>
        );
      case 'medico':
        return (
          <>
            <button className="eye-button" onClick={() => setContent('doctor-view')}>
              <i className="fas fa-eye"></i>
            </button>
            <button className="edit-button" onClick={() => setContent('doctor-edit')}>
              Editar
            </button>
          </>
        );
      case 'usuario':
        return (
          <>
            <UploadHistorialMedico />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`main ${isNavActive ? 'active' : ''}`}>
      <div className="topbar">
        <div className="toggle" onClick={handleToggleClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="nombre">
          <h2>Hola, {role === 'administrador' ? 'Admin ' : role === 'medico' ? 'Doctor ' : role === 'usuario' ? 'Paciente ' : ''}{username}</h2>
        </div>
        
        <div className="user">
          {userImage ? (
            <img src={userImage} alt="User" />
          ) : (
            <img src={letterImages[username.charAt(0).toUpperCase()]} alt="Default User" />
          )}
        </div>
        
      </div>

      <div className="flecha-atras" onClick={handleBackClick}>
        <i className="fa-solid fa-chevron-left fecha-back"></i>
      </div>

      <div className="details">
        <div className="recentOrders">
          <div className="cardBox">
            <div className="card-empleo">
              <div className="profile-container">
                <img
                  className="profile-picture"
                  src={role === 'administrador' ? Monitoreo : MisCitas}
                  alt="Profile Picture"
                />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">{role === 'administrador' ? 'Monitoreo' : 'Mis citas'}</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => role === 'usuario' ? setContent('ver-citas') : role === 'medico' ? setContent('ver-citas-medicas') : setContent('view')}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => role === 'usuario' ? setContent('ver-citas') : setContent('account')}>
                    Editar
                  </button>
                </div>
              </div>
            </div>

            <div className="card-beneficiarios">
              <div className="profile-container">
                <img className="profile-picture" src={HistorialMedico} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">{role === 'administrador' ? 'Lista de usuarios' : role === 'medico' ? 'Mis pacientes' : role === 'usuario' ? 'Historial Medico' : ''}</h2>
                <div className="button-container">
                  {getBeneficiariosButtonContent()}
                </div>
              </div>
            </div>
            <div className="card-bajas">
              <div className="profile-container">
                <img className="profile-picture" src={CongifCuenta} alt="Profile Picture" />
              </div>
              <div className="title-button-container">
                <h2 className="title-card">Configuracion de la cuenta</h2>
                <div className="button-container">
                  <button className="eye-button" onClick={() => setContent('view')}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="edit-button" onClick={() => setContent('account')}>
                    Editar
                  </button>
                </div>
              </div>
            </div>

            {role === 'administrador' && (
              <div className="card-prejubilado">
                <div className="profile-container">
                  <img className="profile-picture" src={Reportes} alt="Profile Picture" />
                </div>
                <div className="title-button-container">
                  <h2 className="title-card">Reportes</h2>
                  <div className="button-container">
                    <button className="eye-button" onClick={() => setContent('view')}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="edit-button" onClick={() => setContent('account')}>
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="recentCustomers">
          <div className="profile-container">
            <img src={userImage ? userImage : letterImages[username.charAt(0).toUpperCase()]} alt="Foto" className="profile-pic" />
            <div className="button-container">
              <button className="eye-button" onClick={() => setContent('view')}>
                <i className="fas fa-eye"></i>
              </button>
              <button className="edit-button" onClick={() => setContent('account')}>
                Editar
              </button>
            </div>
          </div>
          <div className="info-container">
            <div className="info-item">
              <i className="fa-regular fa-user user-icon"></i>
              <div className="info-text">
                <div className="info-titulo">
                  <p>Nombre</p>
                </div>
                <div className="info-nombre">
                  <p className="nombre">{username}</p>
                  <p className="apellido">{apellidoPaterno} {apellidoMaterno}</p>
                </div>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-regular fa-envelope corazon-icon"></i>
              <div className="info-text">
                <div className="info-titulo">
                  <p>Email</p>
                </div>
                <div className="info-nombre">
                  <p className="nombre">{email}</p>
                </div>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-mobile-screen movil-icon"></i>
              <div className="info-text">
                <div className="info-titulo">
                  <p>Celular</p>
                </div>
                <div className="info-nombre">
                  <p className="nombre">{telefono}</p>
                </div>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-id-card GPS-icon"></i>
              <div className="info-text">
                <div className="info-titulo">
                  <p>CURP</p>
                </div>
                <div className="info-nombre">
                  <p className="nombre">{curp}</p>
                </div>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-droplet pin-icon"></i>
              <div className="info-text">
                <div className="info-titulo">
                  <p>Tipo de Sangre</p>
                </div>
                <div className="info-nombre">
                  <p className="nombre">{tipoSangre}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {role === 'medico' && (
        <div className="wiki-search-section">
          <WikiSearch />
        </div>
      )}
    </div>
  );
};

export default Main;