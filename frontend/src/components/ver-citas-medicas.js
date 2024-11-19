import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import { format, addDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'; // Importa las funciones necesarias de date-fns
import styles from '../styles/Ver-todos.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import config from '../config'; // Importa la configuración
import Search from '../components/Search'; // Importa el componente Search
import RecetaModal from '../components/Form-modal-recta'; // Importa el componente RecetaModal
import ButtonReceta from '../components/boton-rectea'; // Importa el componente ButtonReceta

const VerCitasMedicas = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [citas, setCitas] = useState([]); // Estado para almacenar los datos de las citas
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const [filter, setFilter] = useState('today'); // Estado para manejar el filtro de citas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
  const [selectedCita, setSelectedCita] = useState(null); // Estado para manejar la cita seleccionada

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
    const fetchCitas = async (filter) => {
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

        let startDate, endDate;
        const today = startOfDay(new Date());
        const tomorrow = endOfDay(addDays(new Date(), 1));
        const thisWeekStart = startOfWeek(new Date());
        const thisWeekEnd = endOfWeek(new Date());
        const nextWeekStart = startOfWeek(addDays(new Date(), 7));
        const nextWeekEnd = endOfWeek(addDays(new Date(), 7));
        const thisMonthStart = startOfMonth(new Date());
        const thisMonthEnd = endOfMonth(new Date());
        const nextMonthStart = startOfMonth(addDays(new Date(), 30));
        const nextMonthEnd = endOfMonth(addDays(new Date(), 30));

        switch (filter) {
          case 'today':
            startDate = today;
            endDate = endOfDay(today);
            break;
          case 'tomorrow':
            startDate = startOfDay(tomorrow);
            endDate = endOfDay(tomorrow);
            break;
          case 'week':
            startDate = thisWeekStart;
            endDate = thisWeekEnd;
            break;
          case 'nextWeek':
            startDate = nextWeekStart;
            endDate = nextWeekEnd;
            break;
          case 'thisMonth':
            startDate = thisMonthStart;
            endDate = thisMonthEnd;
            break;
          case 'nextMonth':
            startDate = nextMonthStart;
            endDate = nextMonthEnd;
            break;
          default:
            startDate = today;
            endDate = endOfDay(today);
        }

        const filteredCitas = citasData.filter(cita => {
          const citaDate = new Date(cita.fecha);
          return citaDate >= startDate && citaDate <= endDate;
        });
        const sortedCitas = filteredCitas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setCitas(sortedCitas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };

    fetchCitas(filter);
  }, [filter]);

  const handleBackClick = () => {
    setContent('main'); // Redirige al estado main
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleOpenModal = (cita) => {
    setSelectedCita(cita);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCita(null);
  };

  const handleSaveReceta = async (recetaData) => {
    try {
      // Aquí puedes hacer una llamada a la API para guardar la receta en la base de datos
      // await axios.post(`${config.apiBaseUrl}/recetas`, recetaData, {
      // headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // Verificar que todos los campos necesarios estén presentes
      const requiredFields = ['paciente_nombre', 'paciente_apellido_paterno', 'medicamento', 'dosis', 'frecuencia', 'duracion'];
      for (const field of requiredFields) {
        if (!recetaData[field]) {
          throw new Error(`Missing field: ${field}`);
        }
      }

      // Generar el PDF de la receta médica
      const response = await axios.post(`${config.apiBaseUrl}/generate-receta-pdf`, recetaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob' // Asegúrate de que la respuesta sea un blob
      });

      // Crear un enlace para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'receta_medica.pdf');
      document.body.appendChild(link);
      link.click();

      // Cerrar el modal después de guardar
      handleCloseModal();
    } catch (error) {
      console.error('Error saving receta:', error);
    }
  };

  const handleDownloadHistorial = (historialUrl, tipo) => {
    const link = document.createElement('a');
    link.href = `${config.apiBaseUrl}/uploads/historial_medico/${historialUrl}`;
    link.setAttribute('download', tipo === 'application/pdf' ? 'historial_medico.pdf' : 'historial_medico.png');
    document.body.appendChild(link);
    link.click();
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

      <div className={styles.filterButtons}>
        <button onClick={() => setFilter('today')}>Hoy</button>
        <button onClick={() => setFilter('tomorrow')}>Mañana</button>
        <button onClick={() => setFilter('week')}>Esta Semana</button>
        <button onClick={() => setFilter('nextWeek')}>Próxima Semana</button>
        <button onClick={() => setFilter('thisMonth')}>Este Mes</button>
        <button onClick={() => setFilter('nextMonth')}>Próximo Mes</button>
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
                <th>Historial Médico</th>
                <th>Acciones</th>
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
                  <td>
                    <button onClick={() => handleDownloadHistorial(cita.historial_medico, cita.historial_medico_tipo)}>Descargar Historial</button>
                  </td>
                  <td>
                    <ButtonReceta onClick={() => handleOpenModal(cita)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <RecetaModal
          cita={selectedCita}
          onClose={handleCloseModal}
          onSave={handleSaveReceta}
        />
      )}
    </div>
  );
};

export default VerCitasMedicas;