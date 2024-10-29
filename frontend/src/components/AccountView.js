import React, { useState, useEffect } from 'react';
import styles from '../styles/AccountDetails.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import letterImages from '../utils/letterImages'; // Importa el mapeo de imágenes

const AccountView = ({ setContent }) => {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [estadoCivil, setEstadoCivil] = useState('soltero'); // Estado para el select
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
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
        const response = await axios.get('http://127.0.0.1:5000/user-info', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const name = response.data.name;
        setUsername(name);

        // Obtener la primera letra del nombre de usuario
        const firstLetter = name.charAt(0).toUpperCase();

        // Seleccionar la imagen adecuada basada en la primera letra
        setUserImage(letterImages[firstLetter] || null); // Establecer la imagen o null si no hay coincidencia
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
    setContent('main'); // Redirige al estado main
  };

  return (
    <div className={`${styles.main} ${isNavActive ? styles.active : ''}`}>
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={handleToggleClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={styles.nombre}>
          <h2>Hola, {username}</h2>
        </div>
        
        <div className={styles.user}>
          {userImage ? (
            <img src={userImage} alt="User" />
          ) : (
            <img src="img/customer01.jpg" alt="Default User" />
          )}
        </div>
      </div>
      <div className="flecha-atras" onClick={handleBackClick}>
          <i className="fa-solid fa-chevron-left fecha-back"></i>
      </div>

      <div className={styles.title}>
        <h2><em>VER DATOS</em></h2>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <div className={styles.subtitulo}>
            <h3><em>Datos de su cuenta</em></h3>
          </div>
          <div className={styles.cardBox}>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Primer Apellido</div>
              <span id="inputRFC">Escriba apellido paterno</span>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Segundo Apellido</div>
              <span id="inputNombre">Escriba apellido materno</span>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}> CURP</div>
              <span id="inputCURP">Escriba la CURP</span>
            </div>
          </div>
          <div className={styles.subtitulo}>
            <h3><em>Datos Personales</em></h3>
          </div>
          <div className={styles.cardBox2}>
            <div className={styles.input}>
              <div className={styles.Tnombre}> Sexo</div>
              <div style={{ display: 'flex', paddingTop: '5px' }}>
                <div style={{ paddingRight: '50px' }}>
                  <span>H</span>
                </div>
                <div>
                  <span>M</span>
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Tipo de Sangre</div>
              <span id="input2">{estadoCivil}</span>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Email</div>
              <span id="input1">Escriba el Email</span>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}> Telefono</div>
              <span id="input2">Escriba el Telefono</span>
            </div>
          </div>
          <div className={styles.cardBox}>
              <div className={styles.input}>
                <div className={styles.Tnombre}>Fecha de Nacimiento</div>
                <span id="input2">2000-12-01</span>
              </div>
              <div className={styles.input2}>
                <div className={styles.Tnombre}>Alergia a Medicamentos</div>
                <span id="input1">Escriba si es alérgico a algún medicamento</span>
              </div>
          </div>
          <div className={styles.botonBuscar}>
            <button type="button" className={styles.botonAtras} onClick={handleBackClick}>Volver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;