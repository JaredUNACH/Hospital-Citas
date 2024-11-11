import React, { useEffect, useState } from 'react';
import '../styles/FormAgenda.css'; // Importa los estilos CSS para FormAgenda
import Calendar from 'react-calendar'; // Importa el componente de calendario
import 'react-calendar/dist/Calendar.css'; // Importa los estilos CSS para el calendario
import { getSpecialtyWithGender } from '../utils/genero-especialidad'; // Importa la función desde utils
import Button from './botton-add'; // Importa el componente Button
import letterImages from '../utils/letterImages'; // Importa el mapeo de imágenes
import config from '..//config'; // Importa la configuración

const FormAgenda = ({ doctors }) => {
  const [doctorsWithImages, setDoctorsWithImages] = useState([]);

  useEffect(() => {
    const updatedDoctors = doctors.map(doctor => {
      const profilePicture = doctor.profile_picture ? `${config.apiBaseUrl}/${doctor.profile_picture.replace(/\\/g, '/')}` : null;
      const firstLetter = doctor.nombre.charAt(0).toUpperCase();
      const image = profilePicture || letterImages[firstLetter] || null;
      return { ...doctor, image };
    });
    setDoctorsWithImages(updatedDoctors);
  }, [doctors]);

  return (
    <div className="form-agenda-container">
      {doctorsWithImages.map((doctor, index) => (
        <div key={index} className="doctor-card">
          <div className="doctor-info">
            <div className="doctor-photo-placeholder"> {/* Placeholder para la foto del doctor */}
              <img src={doctor.image} alt="Doctor" />
            </div>
            <div className="doctor-details">
              <h2>{doctor.nombre} {doctor.apellido_paterno}</h2>
              <p>{getSpecialtyWithGender(doctor.especialidad, doctor.sexo)}</p>
            </div>
            <br />
            <div className="appointment-details">
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Teléfono:</strong> {doctor.telefono}</p>
              <div className="desktop-button-container">
                <Button className="desktop-button" /> {/* Botón para dispositivos de escritorio */}
              </div>
            </div>
          </div>
          <div className="appointment-info">
            <div className="calendar-container">
              <Calendar />
            </div>
            <div className="mobile-button-container">
              <Button className="mobile-button" /> {/* Botón para dispositivos móviles */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormAgenda;