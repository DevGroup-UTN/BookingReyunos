import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ctdr-utnreyunos.netlify.app//users/forgot-password', { email });
      setMessage('Si el email es válido, recibirás instrucciones para restablecer tu contraseña.');
    } catch (error) {
      setMessage('Error: No se pudo enviar el email.');
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>¿Olvidaste tu Contraseña?</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
        {message && <p>{message}</p>}
        <button type="button" onClick={onClose} style={{ marginTop: '10px' }}>Cancelar</button> {/* Agregado margen superior */}
      </form>
    </div>
  );
}

export default ForgotPassword;
