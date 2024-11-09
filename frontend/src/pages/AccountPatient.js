import React, { useState } from 'react';
import EffectsAccount from '../components/EffectsAccount';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import AccountEdit from '../components/AccountEdit'; // Componente para editar detalles de la cuenta
import AccountView from '../components/AccountView'; // Componente para visualizar los detalles de la cuenta
import UserList from '../components/user-list'; // Importa el componente UserList
import VerTodosPacientes from '../components/Ver-todos-pacientes'; // Importa el componente VerTodosPacientes
import VerTodosMedicos from '../components/Ver-todos-medicos'; // Importa el componente VerTodosMedicos
import { Link } from 'react-router-dom';
import '../styles/AccountPatient.css';

const AccountPatient = () => {
  const [content, setContent] = useState('main'); // Estado para controlar el contenido

  const renderContent = () => {
    switch (content) {
      case 'main':
        return <Main setContent={setContent} />;
      case 'account':
        return <AccountEdit setContent={setContent} />;
      case 'view':
        return <AccountView setContent={setContent} />;
      case 'user-list': // Opción para redirigir a UserList
        return <UserList setContent={setContent} />;
      case 'ver-todos-pacientes': // Opción para redirigir a VerTodosPacientes
        return <VerTodosPacientes setContent={setContent} />;
      case 'ver-todos-medicos': // Nueva opción para redirigir a VerTodosMedicos
        return <VerTodosMedicos setContent={setContent} />;
      default:
        return <Main setContent={setContent} />;
    }
  };

  return (
    <div className="container">
      <Navigation setContent={setContent} /> {/* Pasar la función de cambio de contenido */}
      {renderContent()}
      <EffectsAccount />
      <Link to="/logout">Cerrar sesión</Link> {/* Enlace para cerrar sesión */}
    </div>
  );
};

export default AccountPatient;