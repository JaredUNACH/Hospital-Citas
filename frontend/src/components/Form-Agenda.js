import React from 'react';
import '../styles/FormAgenda.css'; // Importa los estilos CSS para FormAgenda
import Calendar from 'react-calendar'; // Importa el componente de calendario
import 'react-calendar/dist/Calendar.css'; // Importa los estilos CSS para el calendario

const FormAgenda = () => {
  // Datos manuales del doctor
  const doctor = {
    name: 'Dr. Falso',
    specialty: 'Especialidad Falsa',
    address: 'Dirección Falsa 123, Ciudad Falsa',
    price: 999
  };

  return (
    <div className="form-agenda-container">
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
          <p><strong>Dirección:</strong> {doctor.address}</p>
          <p><strong>Precio de la consulta:</strong> ${doctor.price}</p>
        </div>
      </div>
      <div className="appointment-info">
        <div className="calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default FormAgenda;