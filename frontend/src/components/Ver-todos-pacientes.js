import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import styles from '../styles/Ver-todos.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BotonEliminar from './Boton-eliminar'; // Importa el componente BotonEliminar
import BotonGuardar from './Boton-guardar'; // Importa el componente BotonGuardar
import Search from './Search'; // Importa el componente Search
import AñadirNuevo from './Añadir-nuevo'; // Importa el componente AñadirNuevo
import FormModal from './Form-modal'; // Importa el componente FormModal
import config from '../config'; // Importa la configuración

const VerTodosPacientes = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [pacientes, setPacientes] = useState([]); // Estado para almacenar los datos de los pacientes
  const [editing, setEditing] = useState({}); // Estado para manejar la edición en línea
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal

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
        const response = await axios.get(`${config.apiBaseUrl}/pacientes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Verifica los datos recibidos
        const pacientesData = response.data[0]; // Ajuste para obtener solo los datos de los pacientes
        const sortedPacientes = pacientesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setPacientes(sortedPacientes);
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleBackClick = () => {
    setContent('user-list'); // Redirige al estado main
  };

  const handleDoubleClick = (id, field, value) => {
    setEditing({ id, field, value });
  };

  const handleChange = (e) => {
    setEditing({ ...editing, value: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`${config.apiBaseUrl}/pacientes/${id}`, {
        [editing.field]: editing.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setPacientes(pacientes.map(paciente => 
        paciente.id === id ? { ...paciente, [editing.field]: editing.value } : paciente
      ));
      setEditing({});
    } catch (error) {
      console.error('Error updating paciente:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.apiBaseUrl}/pacientes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setPacientes(pacientes.filter(paciente => paciente.id !== id));
    } catch (error) {
      console.error('Error deleting paciente:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNewPaciente = async (formData) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/pacientes`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setPacientes([...pacientes, response.data[0]]); // Asegúrate de añadir el nuevo paciente al estado
    } catch (error) {
      console.error('Error saving new paciente:', error);
    }
  };

  const filteredPacientes = pacientes.filter(paciente =>
    (paciente.nombre && paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (paciente.apellido_paterno && paciente.apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (paciente.apellido_materno && paciente.apellido_materno.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <h2><em>Lista de Pacientes</em></h2>
        <div className={styles.searchContainer}>
          <Search onSearch={handleSearch} /> {/* Componente de búsqueda */}
        </div>
        <div className={styles.añadirNuevoContainer}>
          <AñadirNuevo onClick={handleOpenModal} /> {/* Componente AñadirNuevo */}
        </div>
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
                <th className={styles.smallColumn}>Editar</th> {/* Añadir clase para ajustar el ancho */}
                <th className={styles.smallColumn}>Eliminar</th> {/* Añadir clase para ajustar el ancho */}
              </tr>
            </thead>
            <tbody>
              {filteredPacientes.map((paciente, index) => (
                <tr key={paciente.id || index}>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'nombre', paciente.nombre)}>
                    {editing.id === paciente.id && editing.field === 'nombre' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.nombre
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'apellido_paterno', paciente.apellido_paterno)}>
                    {editing.id === paciente.id && editing.field === 'apellido_paterno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.apellido_paterno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'apellido_materno', paciente.apellido_materno)}>
                    {editing.id === paciente.id && editing.field === 'apellido_materno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.apellido_materno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'curp', paciente.curp)}>
                    {editing.id === paciente.id && editing.field === 'curp' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.curp
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'sexo', paciente.sexo)}>
                    {editing.id === paciente.id && editing.field === 'sexo' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.sexo
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'tipo_sangre', paciente.tipo_sangre)}>
                    {editing.id === paciente.id && editing.field === 'tipo_sangre' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.tipo_sangre
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'email', paciente.email)}>
                    {editing.id === paciente.id && editing.field === 'email' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.email
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'telefono', paciente.telefono)}>
                    {editing.id === paciente.id && editing.field === 'telefono' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.telefono
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'fecha_nacimiento', paciente.fecha_nacimiento)}>
                    {editing.id === paciente.id && editing.field === 'fecha_nacimiento' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.fecha_nacimiento
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(paciente.id, 'alergia_medicamentos', paciente.alergia_medicamentos)}>
                    {editing.id === paciente.id && editing.field === 'alergia_medicamentos' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      paciente.alergia_medicamentos
                    )}
                  </td>
                  <td className={styles.smallColumn}>
                    <BotonGuardar onClick={() => handleSave(paciente.id)} />
                  </td>
                  <td className={styles.smallColumn}>
                    <div className={styles.botonEliminarWrapper}>
                      <BotonEliminar onClick={() => handleDelete(paciente.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <FormModal onClose={handleCloseModal} onSave={handleSaveNewPaciente} />} {/* Modal con el componente FormModal */}
    </div>
  );
};

export default VerTodosPacientes;