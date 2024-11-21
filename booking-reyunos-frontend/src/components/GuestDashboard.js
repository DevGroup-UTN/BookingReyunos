import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GuestDashboard.css';
import { useAuth } from '../context/AuthContext';

const GuestDashboard = () => {
  const { user, setUser } = useAuth(); // Obtener el usuario desde el AuthContext
  console.log(user);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '', // Por si no tiene teléfono
      });
    }
  }, [user]);

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://bookingreyunos-production.up.railway.app/users/${user.id}`,
        formData
      );
      setUser(response.data); // Actualizar el usuario en el contexto
      setMessage('Datos actualizados correctamente.');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      setMessage('Hubo un error al actualizar tus datos.');
    }
  };

  return (
    <div className="guest-dashboard-container">
      <h2 className="guest-dashboard-title">Mi Perfil</h2>
      {message && <p className="message">{message}</p>}
      <form className="user-form" onSubmit={handleSubmit}>
        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="update-button">Actualizar Datos</button>
      </form>
    </div>
  );
};

export default GuestDashboard;
