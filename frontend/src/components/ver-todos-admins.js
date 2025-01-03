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
import FormModal from './Form-modal-admins'; // Importa el componente FormModal para administradores
import config from '../config'; // Importa la configuración

const VerTodosAdmins = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [administradores, setAdministradores] = useState([]); // Estado para almacenar los datos de los administradores
  const [editing, setEditing] = useState({}); // Estado para manejar la edición en línea
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const [filterGenero, setFilterGenero] = useState(''); // Estado para manejar el filtro de género
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
  const [currentPage, setCurrentPage] = useState(1); // Estado para manejar la página actual
  const itemsPerPage = 30; // Número de elementos por página

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
    // Función para obtener los datos de los administradores
    const fetchAdministradores = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/administradores`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Verifica los datos recibidos
        setAdministradores(response.data); // Ajuste para obtener solo los datos de los administradores
      } catch (error) {
        console.error('Error fetching administradores:', error);
      }
    };

    fetchAdministradores();
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
      const response = await axios.put(`${config.apiBaseUrl}/administradores/${id}`, {
        [editing.field]: editing.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setAdministradores(administradores.map(admin => 
        admin.id === id ? { ...admin, [editing.field]: editing.value } : admin
      ));
      setEditing({});
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.apiBaseUrl}/administradores/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setAdministradores(administradores.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterGenero = (e) => {
    setFilterGenero(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNewAdmin = async (formData) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/administradores`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setAdministradores([...administradores, response.data]); // Asegúrate de añadir el nuevo administrador al estado
      setIsModalOpen(false); // Cierra el modal después de guardar
    } catch (error) {
      console.error('Error saving new admin:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filteredAdministradores = administradores.filter(admin =>
    (admin.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.apellido_paterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.apellido_materno?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterGenero ? admin.sexo === filterGenero : true)
  );

  const paginatedAdministradores = filteredAdministradores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <h2><em>Lista de Administradores</em></h2>
        <div className={styles.searchContainer}>
          <Search onSearch={handleSearch} /> {/* Componente de búsqueda */}
        </div>
        <div className={styles.filterContainer}>
          <select className={styles.filterSelect} onChange={handleFilterGenero} value={filterGenero}>
            <option value="">Todos los Géneros</option>
            <option value="H">Masculino</option>
            <option value="F">Femenino</option>
          </select>
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
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha de Nacimiento</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdministradores.map((admin, index) => (
                <tr key={admin.id || index}>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'nombre', admin.nombre)}>
                    {editing.id === admin.id && editing.field === 'nombre' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.nombre
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'apellido_paterno', admin.apellido_paterno)}>
                    {editing.id === admin.id && editing.field === 'apellido_paterno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.apellido_paterno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'apellido_materno', admin.apellido_materno)}>
                    {editing.id === admin.id && editing.field === 'apellido_materno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.apellido_materno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'email', admin.email)}>
                    {editing.id === admin.id && editing.field === 'email' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.email
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'telefono', admin.telefono)}>
                    {editing.id === admin.id && editing.field === 'telefono' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.telefono
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(admin.id, 'fecha_nacimiento', admin.fecha_nacimiento)}>
                    {editing.id === admin.id && editing.field === 'fecha_nacimiento' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      admin.fecha_nacimiento
                    )}
                  </td>
                  <td>
                    <BotonGuardar onClick={() => handleSave(admin.id)} />
                  </td>
                  <td>
                    <div className={styles.botonEliminarWrapper}>
                      <BotonEliminar onClick={() => handleDelete(admin.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Atrás</button>
            <span>Página {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage * itemsPerPage >= filteredAdministradores.length}>Adelante</button>
          </div>
        </div>
      </div>
      {isModalOpen && <FormModal onClose={handleCloseModal} onSave={handleSaveNewAdmin} />} {/* Modal con el componente FormModal */}
    </div>
  );
};

export default VerTodosAdmins;