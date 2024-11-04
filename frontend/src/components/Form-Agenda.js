import React from 'react';
import '../styles/FormAgenda.css'; // Importa los estilos CSS para FormAgenda
import Calendar from 'react-calendar'; // Importa el componente de calendario
import 'react-calendar/dist/Calendar.css'; // Importa los estilos CSS para el calendario

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
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty}</p>
            </div>
            <br />
            <div className="appointment-details">
              <p><strong>Email:</strong> {doctor.email}</p>
            </div>
          </div>
          <div className="appointment-info">
            <div className="calendar-container">
              <Calendar />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormAgenda;