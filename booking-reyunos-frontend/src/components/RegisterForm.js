// Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registro.css';

function Registro({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bookingreyunos-production.up.railway.app/users/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
      setMessage('Registro exitoso. Puedes iniciar sesión ahora.');
    } catch (error) {
      setMessage('Error: No se pudo registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="registro-form">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Registro;
