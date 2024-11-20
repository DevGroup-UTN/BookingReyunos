import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de las 3 rayas
import ForgotPassword from './ForgotPassword';
import RegisterForm from './RegisterForm';
import '../styles/App.css';

function LoginForm({ onClose }) {
  const { login } = useAuth();
  const [id, setid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState('login'); // Controla la vista
  const [userRole, setUserRole] = useState(null); // Nuevo estado para guardar el rol del usuario
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado
  const navigate = useNavigate();

  const resetForm = () => {
    setid('');
    setUsername('');
    setPassword('');
    setMessage('');
    setView('login'); // Siempre vuelve a la vista de login
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { // Verifica si la tecla presionada es "Esc"
        onClose(); // Llama a la función onClose
      }
    };

    // Agrega el listener al document
    document.addEventListener('keydown', handleKeyDown);

    // Limpieza del listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        username,
        password,
      });

      const userData = response.data;
      login(userData);
      setUserRole(userData.role); // Guardamos el rol del usuario
      setMessage(`Bienvenido, ${userData.username}`);
      onClose(); // Cierra el menú
      resetForm(); // Reinicia el formulario
      navigate('/dashboard'); // Redirige al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error: Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión (borrar token, etc.)
    login(null); // Llama a login con null para borrar los datos del usuario
    setUserRole(null); // Limpiar el rol
    navigate('/'); // Redirige a la página principal
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Cambia el estado del menú
  };

  const renderContent = () => {
    switch (view) {
      case 'forgotPassword':
        return <ForgotPassword onClose={() => setView('login')} />;
      case 'register':
        return <RegisterForm onClose={() => setView('login')} />;
      case 'login':
      default:
        return (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div>
              <label>Usuario:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Iniciar Sesión</button>
            {message && <p>{message}</p>}
            <div className="login-options">
              <button type="button" onClick={() => setView('forgotPassword')}>
                ¿Olvidaste tu contraseña?
              </button>
              <br />
              <button type="button" onClick={() => setView('register')}>
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="login-container">
      <button className="close-button" onClick={() => {
        resetForm();
        onClose();
      }}><FontAwesomeIcon icon={faTimes} /></button>

      {renderContent()} {/* Renderiza el contenido dinámicamente */}
    </div>
  );
}

export default LoginForm;
