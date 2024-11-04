import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/SpecialtySelect.css';

const socket = io('http://127.0.0.1:5000');

const SpecialtySelect = ({ onChange }) => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/specialties');
        const specialtyOptions = response.data.map(specialty => ({
          value: specialty.nombre, // Usar el nombre de la especialidad como valor
          label: specialty.nombre // Asegúrate de usar el nombre correcto del campo
        }));
        setSpecialties(specialtyOptions);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('request_specialties');
    });

    socket.on('specialties_data', (data) => {
      const specialtyOptions = data.map(specialty => ({
        value: specialty.nombre, // Usar el nombre de la especialidad como valor
        label: specialty.nombre
      }));
      setSpecialties(specialtyOptions);
    });

    return () => {
      socket.off('connect');
      socket.off('specialties_data');
    };
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedSpecialty(selectedOption);
    onChange(selectedOption); // Llamar a la función onChange pasada como prop
    console.log('Selected specialty:', selectedOption);
  };

  return (
    <div className="specialty-select">
      <Select
        value={selectedSpecialty}
        onChange={handleChange}
        options={specialties}
        placeholder="Selecciona especialidad"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SpecialtySelect;