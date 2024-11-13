import React, { useState } from 'react';
import styled from 'styled-components';

const FormModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    curp: '',
    sexo: '',
    tipo_sangre: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    alergia_medicamentos: '',
    rol: 'usuario', // Valor predeterminado para el rol
    password: '' // Campo para la contraseña
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <ModalWrapper>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Registro de Paciente</p>
            <div className="flex">
              <label>
                <input className="input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder required />
                <span>Nombre</span>
              </label>
              <label>
                <input className="input" type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} placeholder required />
                <span>Primer apellido</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input className="input" type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} placeholder required />
                <span>Segundo apellido</span>
              </label>
              <label>
                <input className="input" type="text" name="curp" value={formData.curp} onChange={handleChange} placeholder required />
                <span>CURP</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input className="input" type="text" name="sexo" value={formData.sexo} onChange={handleChange} placeholder required />
                <span>Sexo</span>
              </label>
              <label>
                <input className="input" type="text" name="tipo_sangre" value={formData.tipo_sangre} onChange={handleChange} placeholder required />
                <span>Tipo de Sangre</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder required />
                <span>Email</span>
              </label>
              <label>
                <input className="input" type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder required />
                <span>Teléfono</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input className="input" type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} placeholder required />
                <span>Fecha de Nacimiento</span>
              </label>
              <label>
                <input className="input" type="text" name="alergia_medicamentos" value={formData.alergia_medicamentos} onChange={handleChange} placeholder required />
                <span>Alergia a Medicamentos</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder required />
                <span>Contraseña</span>
              </label>
            </div>
            <button className="submit" type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1200; /* Asegúrate de que el z-index sea suficientemente alto */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo transparente */
  }

  .modal-content {
    background-color: #fff; /* Fondo blanco */
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%; /* Ajusta el ancho del modal */
    max-width: 800px; /* Ajusta el ancho máximo del modal */
    border-radius: 10px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Sombra para darle un efecto de elevación */
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 100%; /* Ajusta el ancho del formulario */
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
    flex: 1;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 5px 5px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
    box-sizing: border-box; /* Asegúrate de que el padding se incluya en el ancho total */
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @media (max-width: 768px) {
    .flex {
      flex-direction: column;
    }

    .form label .input {
      padding: 15px 5px 5px 10px; /* Ajusta el padding para pantallas pequeñas */
    }
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default FormModal;