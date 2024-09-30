import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/SpecialtySelect.css';

const API_BASE_URL = "https://hospital-citas.onrender.com";
const socket = io(API_BASE_URL);

const SpecialtySelect = () => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/specialties`);
        const specialtyOptions = response.data.map(specialty => ({
          value: specialty.id,
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
        value: specialty.id,
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