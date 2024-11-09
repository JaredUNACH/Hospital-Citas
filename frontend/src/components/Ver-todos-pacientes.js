import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import styles from '../styles/Ver-todos.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BotonReportes from './BotonReportes'; // Importa el componente BotonReportes
import EditUserButton from './boton-editar-user'; // Importa el componente EditUserButton

const VerTodosPacientes = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [pacientes, setPacientes] = useState([]); // Estado para almacenar los datos de los pacientes

  const handleToggleClick = () => {
    setIsNavActive(!isNavActive);
  };

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

  useEffect(() => {
    // Función para obtener los datos de los pacientes
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/pacientes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Verifica los datos recibidos
        setPacientes(response.data[0]); // Ajuste para obtener solo los datos de los pacientes
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleBackClick = () => {
    setContent('user-list'); // Redirige al estado main
  };

  return (
    <div className={`${styles.main} ${isNavActive ? styles.active : ''}`}>
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={handleToggleClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="flecha-atras" onClick={handleBackClick}>
        <i className="fa-solid fa-chevron-left fecha-back"></i>
      </div>

      <div className={styles.title}>
        <h2><em>Lista de Pacientes</em></h2>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <table className={styles.styledTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>CURP</th>
                <th>Sexo</th>
                <th>Tipo de Sangre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha de Nacimiento</th>
                <th>Alergia a Medicamentos</th>
                <th>Historial Médico</th>
                <th>Editar</th>
                <th>Reportes</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente, index) => (
                <tr key={paciente.id || index}>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellido_paterno}</td>
                  <td>{paciente.apellido_materno}</td>
                  <td>{paciente.curp}</td>
                  <td>{paciente.sexo}</td>
                  <td>{paciente.tipo_sangre}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.fecha_nacimiento}</td>
                  <td>{paciente.alergia_medicamentos}</td>
                  <td>{paciente.historial_medico}</td>
                  <td><EditUserButton /></td>
                  <td><BotonReportes /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerTodosPacientes;