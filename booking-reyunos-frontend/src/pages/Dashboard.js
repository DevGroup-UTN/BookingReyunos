// src/components/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerDashboard from '../components/OwnerDashboard';
import GuestDashboard from '../components/GuestDashboard';

const Dashboard = () => {
  const { user } = useAuth(); // Asumiendo que el contexto tiene un objeto `user` con la información del usuario.

  if (!user) {
    return <h2>Acceso denegado. Por favor, inicia sesión.</h2>;
  }

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'OWNER':
        return <OwnerDashboard/>;
      case 'ADMIN':
        return <h2>Bienvenido al Dashboard del Administrador</h2>;
      case 'GUEST':
        return <GuestDashboard/>;
      default:
        return <h2>Rol desconocido</h2>;
    }
  };

  return (
    <div>
      {renderDashboardContent()}
      {/* Puedes añadir más contenido específico para cada rol aquí */}
    </div>
  );
};

export default Dashboard;
