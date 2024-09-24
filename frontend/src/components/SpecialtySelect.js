import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../styles/SpecialtySelect.css';

const SpecialtySelect = () => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/specialties');
        const specialtyOptions = response.data.map(specialty => ({
          value: specialty.id,
          label: specialty.name
        }));
        setSpecialties(specialtyOptions);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
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