import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
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
            <Button className="desktop-button" onClick={() => onAppointment(doctor.id)} /> {/* Botón para dispositivos de escritorio */}
          </div>
        </div>
      </div>
      <div className="appointment-info">
        {selectedDate ? (
          <div className="available-times">
            {availableTimes?.length > 0 ? (
              availableTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => onTimeSelect(doctor.id, time)}
                  className={`${selectedTime === time ? 'selected' : ''}`}
                >
                  {time.time}
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
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const navigate = useNavigate(); // Hook para redirigir

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
      const times = generateTimes(response.data);
      setAvailableTimes(prevTimes => ({
        ...prevTimes,
        [doctorId]: times
      }));
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  const generateTimes = (bookedTimes) => {
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0);

    const times = [];
    while (startTime < endTime) {
      const timeString = startTime.toTimeString().substring(0, 5);
      const isAvailable = !bookedTimes.some(booking => booking.hora === timeString);
      if (isAvailable) {
        times.push({ time: timeString, isAvailable });
      }
      startTime.setMinutes(startTime.getMinutes() + 40); // 30 minutes appointment + 10 minutes break
    }
    return times;
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
      await axios.post(`${config.apiBaseUrl}/citas`, {
        paciente_id: pacienteId, // Usar el ID del paciente desde localStorage
        medico_id: doctorId,
        fecha: selectedDate.toISOString().split('T')[0],
        hora: selectedTime.time,
        estado: 'pendiente'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Cita creada exitosamente');
      navigate('/account-patient'); // Redirigir a la página de cuenta del paciente
    } catch (error) {
      console.error('Error creating appointment:', error);
      setErrorMessage('El horario ya está ocupado. Por favor, seleccione otro horario.'); // Mostrar mensaje de error
      setShowModal(true); // Mostrar el modal
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="form-agenda-container">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
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