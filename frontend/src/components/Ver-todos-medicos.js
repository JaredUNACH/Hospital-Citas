import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import styles from '../styles/Ver-todos.module.css'; // Importa el módulo CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importamos Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BotonEliminar from './Boton-eliminar'; // Importa el componente BotonEliminar
import BotonGuardar from './Boton-guardar'; // Importa el componente BotonGuardar
import Search from './Search'; // Importa el componente Search
import config from '..//config'; // Importa la configuración

const VerTodosMedicos = ({ setContent }) => {
  const [isNavActive, setIsNavActive] = useState(false); // Estado para controlar el toggle de navegación
  const [medicos, setMedicos] = useState([]); // Estado para almacenar los datos de los médicos
  const [editing, setEditing] = useState({}); // Estado para manejar la edición en línea
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
    // Función para obtener los datos de los médicos
    const fetchMedicos = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/medicos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Verifica los datos recibidos
        setMedicos(response.data); // Ajuste para obtener solo los datos de los médicos
      } catch (error) {
        console.error('Error fetching medicos:', error);
      }
    };

    fetchMedicos();
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
      const response = await axios.put(`${config.apiBaseUrl}/medicos/${id}`, {
        [editing.field]: editing.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setMedicos(medicos.map(medico => 
        medico.id === id ? { ...medico, [editing.field]: editing.value } : medico
      ));
      setEditing({});
    } catch (error) {
      console.error('Error updating medico:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.apiBaseUrl}/medicos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor
      setMedicos(medicos.filter(medico => medico.id !== id));
    } catch (error) {
      console.error('Error deleting medico:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMedicos = medicos.filter(medico =>
    medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medico.apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medico.apellido_materno.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2><em>Lista de Médicos</em></h2>
        <Search onSearch={handleSearch} /> {/* Componente de búsqueda */}
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
                <th>Especialidad</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicos.map((medico, index) => (
                <tr key={medico.id || index}>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'nombre', medico.nombre)}>
                    {editing.id === medico.id && editing.field === 'nombre' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.nombre
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'apellido_paterno', medico.apellido_paterno)}>
                    {editing.id === medico.id && editing.field === 'apellido_paterno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.apellido_paterno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'apellido_materno', medico.apellido_materno)}>
                    {editing.id === medico.id && editing.field === 'apellido_materno' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.apellido_materno
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'curp', medico.curp)}>
                    {editing.id === medico.id && editing.field === 'curp' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.curp
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'sexo', medico.sexo)}>
                    {editing.id === medico.id && editing.field === 'sexo' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.sexo
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'tipo_sangre', medico.tipo_sangre)}>
                    {editing.id === medico.id && editing.field === 'tipo_sangre' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.tipo_sangre
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'email', medico.email)}>
                    {editing.id === medico.id && editing.field === 'email' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.email
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'telefono', medico.telefono)}>
                    {editing.id === medico.id && editing.field === 'telefono' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.telefono
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'fecha_nacimiento', medico.fecha_nacimiento)}>
                    {editing.id === medico.id && editing.field === 'fecha_nacimiento' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.fecha_nacimiento
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'alergia_medicamentos', medico.alergia_medicamentos)}>
                    {editing.id === medico.id && editing.field === 'alergia_medicamentos' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.alergia_medicamentos
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(medico.id, 'especialidad', medico.especialidad)}>
                    {editing.id === medico.id && editing.field === 'especialidad' ? (
                      <input type="text" value={editing.value} onChange={handleChange} />
                    ) : (
                      medico.especialidad
                    )}
                  </td>
                  <td>
                    <BotonGuardar onClick={() => handleSave(medico.id)} />
                  </td>
                  <td>
                    <div className={styles.botonEliminarWrapper}>
                      <BotonEliminar onClick={() => handleDelete(medico.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerTodosMedicos;