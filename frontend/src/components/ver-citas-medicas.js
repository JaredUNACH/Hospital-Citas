import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import { format, addDays, startOfDay, endOfDay } from 'date-fns'; // Importa las funciones necesarias de date-fns
import styles from '../styles/Ver-todos.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import config from '../config'; // Importa la configuración
import Search from '../components/Search'; // Importa el componente Search

const VerCitasMedicas = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [citas, setCitas] = useState([]); // Estado para almacenar los datos de las citas
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda

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
    // Función para obtener los datos de las citas
    const fetchCitas = async () => {
      try {
        const medicoId = localStorage.getItem('user_id'); // Obtener el ID del médico desde localStorage
        const response = await axios.get(`${config.apiBaseUrl}/citas-medico`, {
          params: { medico_id: medicoId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Verifica los datos recibidos
        const citasData = response.data; // Ajuste para obtener solo los datos de las citas
        const today = startOfDay(new Date());
        const tomorrow = endOfDay(addDays(new Date(), 1));
        const filteredCitas = citasData.filter(cita => {
          const citaDate = new Date(cita.fecha);
          return citaDate >= today && citaDate <= tomorrow;
        });
        const sortedCitas = filteredCitas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setCitas(sortedCitas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };

    fetchCitas();
  }, []);

  const handleBackClick = () => {
    setContent('main'); // Redirige al estado main
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCitas = citas.filter(cita =>
    (cita.fecha && cita.fecha.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (cita.estado && cita.estado.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (cita.paciente_nombre && cita.paciente_nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (cita.paciente_apellido_paterno && cita.paciente_apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (cita.especialidad_nombre && cita.especialidad_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <h2><em>Mis Citas</em></h2>
        <div className={styles.searchContainer}>
          <Search onSearch={handleSearch} />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <table className={styles.styledTable}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Nombre del Paciente</th>
                <th>Apellido Paterno del Paciente</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitas.map((cita, index) => (
                <tr key={cita.id || index}>
                  <td>{format(new Date(cita.fecha), 'dd/MM/yyyy')}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.estado}</td>
                  <td>{cita.hora_inicio}</td>
                  <td>{cita.hora_fin}</td>
                  <td>{cita.paciente_nombre}</td>
                  <td>{cita.paciente_apellido_paterno}</td>
                  <td>{cita.especialidad_nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerCitasMedicas;