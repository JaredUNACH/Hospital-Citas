import React, { useState, useEffect } from 'react';
import styles from '../styles/AccountDetails.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import letterImages from '../utils/letterImages'; // Importa el mapeo de imágenes

const AccountEdit = ({ setContent }) => {
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

        // Obtener la primera letra del nombre de usuario
        const firstLetter = data.name.charAt(0).toUpperCase();

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

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige al login si no hay token
      return;
    }

    const userData = {
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      curp: curp,
      sexo: sexo,
      tipo_sangre: tipoSangre,
      email: email,
      telefono: telefono,
      fecha_nacimiento: fechaNacimiento,
      alergia_medicamentos: alergiaMedicamentos
    };

    try {
      const response = await axios.put('http://127.0.0.1:5000/update-user-info', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Datos guardados');
    } catch (error) {
      console.error('Failed to save user info:', error);
      alert('Error al guardar los datos');
    }
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
        <h2><em>EDITAR DATOS</em></h2>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <div className={styles.subtitulo}>
            <h3><em>Datos de su cuenta</em></h3>
          </div>
          <div className={styles.cardBox}>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Primer Apellido</div>
              <input type="text" placeholder="Escriba apellido paterno" id="inputRFC" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Segundo Apellido</div>
              <input type="text" placeholder="Escriba apellido materno" id="inputNombre" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}> CURP</div>
              <input type="text" placeholder="Escriba la CURP" id="inputCURP" value={curp} onChange={(e) => setCurp(e.target.value)} />
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
                  <input type="radio" id="hombre" name="sexo" value="H" checked={sexo === 'H'} onChange={(e) => setSexo(e.target.value)} />
                  <label htmlFor="hombre" style={{ marginLeft: '10px' }}>H</label>
                </div>
                <div>
                  <input type="radio" id="mujer" name="sexo" value="M" checked={sexo === 'M'} onChange={(e) => setSexo(e.target.value)} />
                  <label htmlFor="mujer" style={{ marginLeft: '10px' }}>M</label>
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Tipo de Sangre</div>
              <select id="input2" value={tipoSangre} onChange={(e) => setTipoSangre(e.target.value)}>
                <option value="" disabled>Seleccione tipo de sangre</option>
                <option value="A+">A+</option>
                <option value="O+">O+</option>
                {/* Agregar más opciones */}
              </select>
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}>Email</div>
              <input type="text" placeholder="Escriba el Email" id="input1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.input}>
              <div className={styles.Tnombre}> Telefono</div>
              <input type="text" placeholder="Escriba el Telefono" id="input2" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
          </div>
          <div className={styles.cardBox}>
              <div className={styles.input}>
                <div className={styles.Tnombre}>Fecha de Nacimiento</div>
                <input
                  type="date"
                  placeholder="Escriba su fecha (2000-12-01)"
                  id="input2"
                  className={styles.dateInput}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <div className={styles.input2}>
                <div className={styles.Tnombre}>Alergia a Medicamentos</div>
                <textarea
                  placeholder="Escriba si es alérgico a algún medicamento"
                  id="input1"
                  className={styles.textarea}
                  value={alergiaMedicamentos}
                  onChange={(e) => setAlergiaMedicamentos(e.target.value)}
                />
              </div>
          </div>
          <div className={styles.botonBuscar}>
            <button type="button" className={styles.botonAtras} onClick={handleBackClick}>Cancelar</button>
            <button type="button" onClick={handleSaveClick}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountEdit;