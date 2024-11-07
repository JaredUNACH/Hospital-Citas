import React from 'react';
import '../styles/FormAgenda.css'; // Importa los estilos CSS para FormAgenda
import Calendar from 'react-calendar'; // Importa el componente de calendario
import 'react-calendar/dist/Calendar.css'; // Importa los estilos CSS para el calendario
import { getSpecialtyWithGender } from '../utils/genero-especialidad'; // Importa la función desde utils
import Button from './botton-add'; // Importa el componente Button

const FormAgenda = ({ doctors }) => {
  return (
    <div className="form-agenda-container">
      {doctors.map((doctor, index) => (
        <div key={index} className="doctor-card">
          <div className="doctor-info">
            <div className="doctor-photo-placeholder"> {/* Placeholder para la foto del doctor */}
              <span>Foto</span>
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