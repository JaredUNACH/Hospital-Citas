import React, { useState, useEffect } from 'react';
import styles from '../styles/user-list.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BotonReportes from '../components/BotonReportes'; // Importa el componente BotonReportes
import BotonReportesMedicos from '../components/BotonReportes-medicos'; // Importa el componente BotonReportesMedicos
import EditUserButton from '../components/boton-editar-user'; // Importa el componente EditUserButton
import VerUserButton from '../components/VerUserButton'; // Importa el componente VerUserButton
import BotonReportesAdmins from '../components/BotonReportes-admins'; // Importa el componente BotonReportesAdmins'

const UserList = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación

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

  const handleBackClick = () => {
    setContent('main'); // Redirige al estado main
  };

  const handleViewPacientesClick = () => {
    setContent('ver-todos-pacientes'); // Cambia el estado para mostrar VerTodosPacientes
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
        <h2><em>Lista de usuarios</em></h2>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <table className={styles.styledTable}>
            <thead>
              <tr>
                <th>Usuarios</th>
                <th>Ver</th>
                <th>Editar</th>
                <th>Reportes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pacientes</td>
                <td><VerUserButton onClick={handleViewPacientesClick} /></td>
                <td><EditUserButton /></td>
                <td><BotonReportes /></td>
              </tr>
              <tr>
                <td>Medicos</td>
                <td><VerUserButton /></td>
                <td><EditUserButton /></td>
                <td><BotonReportesMedicos /></td>
              </tr>
              <tr>
                <td>Administradores</td>
                <td><VerUserButton /></td>
                <td><EditUserButton /></td>
                <td><BotonReportesAdmins /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;