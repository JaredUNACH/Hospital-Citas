import React, { useEffect, useState } from 'react';
import '../styles/FormAgenda.css'; // Importa los estilos CSS para FormAgenda
import Calendar from 'react-calendar'; // Importa el componente de calendario
import 'react-calendar/dist/Calendar.css'; // Importa los estilos CSS para el calendario
import { getSpecialtyWithGender } from '../utils/genero-especialidad'; // Importa la función desde utils
import Button from './botton-add'; // Importa el componente Button
import letterImages from '../utils/letterImages'; // Importa el mapeo de imágenes
import config from '../config'; // Importa la configuración
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

const DoctorCard = ({ doctor, onDateChange, onTimeSelect, onAppointment, selectedDate, availableTimes, selectedTime }) => {
  return (
    <div className="doctor-card">
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
        {selectedDate ? (
          <div className="available-times">
            {availableTimes?.length > 0 ? (
              availableTimes.map((time, index) => (
                <button key={index} onClick={() => onTimeSelect(doctor.id, time)}>
                  {time}
                </button>
              ))
            ) : (
              <p>No hay horarios disponibles para esta fecha.</p>
            )}
            <div className="mobile-button-container">
              <Button className="mobile-button" onClick={() => onAppointment(doctor.id)} /> {/* Botón para dispositivos móviles */}
            </div>
          </div>
        ) : (
          <div className="calendar-container">
            <Calendar onChange={(date) => onDateChange(doctor.id, date)} value={selectedDate} />
          </div>
        )}
      </div>
    </div>
  );
};

const FormAgenda = ({ doctors }) => {
  const [doctorsWithImages, setDoctorsWithImages] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [availableTimes, setAvailableTimes] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});

  useEffect(() => {
    const updatedDoctors = doctors.map(doctor => {
      const profilePicture = doctor.profile_picture ? `${config.apiBaseUrl}/${doctor.profile_picture.replace(/\\/g, '/')}` : null;
      const firstLetter = doctor.nombre.charAt(0).toUpperCase();
      const image = profilePicture || letterImages[firstLetter] || null;
      return { ...doctor, image };
    });
    setDoctorsWithImages(updatedDoctors);
  }, [doctors]);

  const fetchAvailableTimes = async (doctorId, date) => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/horarios_disponibilidad`, {
        params: { medico_id: doctorId, fecha: date.toISOString().split('T')[0] },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAvailableTimes(prevTimes => ({
        ...prevTimes,
        [doctorId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  const handleDateChange = (doctorId, date) => {
    setSelectedDates(prevDates => ({
      ...prevDates,
      [doctorId]: date
    }));
    fetchAvailableTimes(doctorId, date);
  };

  const handleTimeSelect = (doctorId, time) => {
    setSelectedTimes(prevTimes => ({
      ...prevTimes,
      [doctorId]: time
    }));
  };

  const handleAppointment = async (doctorId) => {
    const selectedDate = selectedDates[doctorId];
    const selectedTime = selectedTimes[doctorId];
    const pacienteId = localStorage.getItem('user_id'); // Obtener el ID del paciente desde localStorage

    if (!selectedDate || !selectedTime) {
      alert('Por favor, seleccione una fecha y una hora.');
      return;
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/citas`, {
        paciente_id: pacienteId, // Usar el ID del paciente desde localStorage
        medico_id: doctorId,
        fecha: selectedDate.toISOString().split('T')[0],
        hora: selectedTime,
        estado: 'pendiente'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Cita creada exitosamente');
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error al crear la cita');
    }
  };

  return (
    <div className="form-agenda-container">
      {doctorsWithImages.map((doctor, index) => (
        <DoctorCard
          key={index}
          doctor={doctor}
          onDateChange={handleDateChange}
          onTimeSelect={handleTimeSelect}
          onAppointment={handleAppointment}
          selectedDate={selectedDates[doctor.id]}
          availableTimes={availableTimes[doctor.id]}
          selectedTime={selectedTimes[doctor.id]}
        />
      ))}
    </div>
  );
};

export default FormAgenda;