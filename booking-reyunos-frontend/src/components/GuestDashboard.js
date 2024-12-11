import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GuestDashboard.css';
import { useAuth } from '../context/AuthContext';

const GuestDashboard = () => {
  const { user, setUser } = useAuth(); // Obtener el usuario desde el AuthContext
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');

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

  // Manejador de cambios en los campos del formulario de datos personales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador de envío del formulario de datos personales
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://bookingreyunos.onrender.com/users/${user.id}`,
        formData
      );
      setUser(response.data); // Actualizar el usuario en el contexto
      setMessage('Datos actualizados correctamente.');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      setMessage('Hubo un error al actualizar tus datos.');
    }
  };

  // Manejador de cambios en los campos del formulario de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador de envío del formulario de cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      await axios.put(
        `https://bookingreyunos.onrender.com/users/${user.id}/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );
      setPasswordMessage('Contraseña actualizada correctamente.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setPasswordMessage('Hubo un error al actualizar tu contraseña.');
    }
  };

  return (
    <div className="guest-dashboard-container" style={{backgroundImage: "url('/images/logo-utn-nav.png')"}}>
        <div className='guest-form-container'>
            <h2 className="guest-dashboard-title" id='guest-dashboard-title'>Mi Perfil</h2>
            {message && <p className="message">{message}</p>}
            <form className="guest-dashboard-form" onSubmit={handleSubmit}>
                <label className='guest-dashboard-label'>
                Nombre:
                <input
                    type="text"
                    className='guest-dashboard-input'
                    id='guest-dashboard-input1'
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </label>
                <label className='guest-dashboard-label'>
                Correo:
                <input
                    type="email"
                    className='guest-dashboard-input'
                    id='guest-dashboard-input2'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </label>
                <label className='guest-dashboard-label'>
                Teléfono:
                <input
                    type="text"
                    id='guest-dashboard-input3'
                    className='guest-dashboard-input'
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                </label>
                <button type="submit" className="guest-update-button" id='guest-update-button-1'>Actualizar Datos</button>
            </form>
        </div>
        <div className='guest-form-container'>
            <h2 className="guest-dashboard-title">Cambiar Contraseña</h2>
            <form className="guest-dashboard-form" onSubmit={handlePasswordSubmit}>
                <label className='guest-dashboard-label'>
                Contraseña Actual:
                <input
                    type="password"
                    id='guest-dashboard-input4'
                    className='guest-dashboard-input'
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                />
                </label>
                <label className='guest-dashboard-label'>
                Nueva Contraseña:
                <input
                    type="password"
                    id='guest-dashboard-input5'
                    className='guest-dashboard-input'
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                />
                </label>
                <label className='guest-dashboard-label'>
                Confirmar Nueva Contraseña:
                <input
                    type="password"
                    id='guest-dashboard-input6'
                    className='guest-dashboard-input'
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                />
                </label>
                <button type="submit" className="guest-update-button" id='guest-update-button-2'>Actualizar Contraseña</button>
                {passwordMessage && <p className="guest-password-message">{passwordMessage}</p>}
            </form>
        </div>
    </div>
  );
};

export default GuestDashboard;
