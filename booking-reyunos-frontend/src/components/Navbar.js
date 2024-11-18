import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './loginForms';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { user, logout } = useAuth(); // Asegúrate de tener el user del contexto
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para manejar el dropdown

  const toggleLogin = (event) => {
    event.stopPropagation();
    setIsLoginOpen(!isLoginOpen);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Alterna la visibilidad del menú desplegable
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Cierra el menú desplegable
  };

  return (
    <>
      <nav className="navbar">
        <div><img className="utn" src='https://files-public-web.s3-us-west-2.amazonaws.com/1472/company/library/user/51742008549581e7db8aba6fb75df56232d673d813.png' alt="Logo" /></div>

        <div className="nav-links">
          <Link to="/">Inicio</Link> | 
          <Link to="/accommodations">Alojamientos</Link> | 
          <Link to="/programas">Programas</Link> | 
          <Link to="/infraestructura">Infraestructura</Link> | 
          <Link to="/contacto">Contacto</Link>
        </div>

        {user ? (
  <>
    <div className="user-info">
      <span onClick={toggleDropdown} className="user-name">
        <FontAwesomeIcon icon={faUser} />
      </span>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {/* Opciones según el rol del usuario */}
          {user.role === "OWNER" && (
            <>
              <Link to="/dashboard" onClick={closeDropdown}>
                Panel de Control
              </Link>
              <Link to="/myAccommodations" onClick={closeDropdown}>
                Mis Alojamientos
              </Link>
              <button onClick={() => { logout(); closeDropdown(); }}>
                Cerrar Sesión
              </button>
            </>
          )}
          {user.role === "ADMIN" && (
            <>
              <Link to="/dashboard" onClick={closeDropdown}>
                Panel de Control
              </Link>
              <button onClick={() => { logout(); closeDropdown(); }}>
                Cerrar Sesión
              </button>
            </>
          )}
          {user.role === "GUEST" && (
            <>
              <Link to="/dashboard" onClick={closeDropdown}>
                Panel de Control
              </Link>
              <Link to="/myBookings" onClick={closeDropdown}>
                Mis Reservas
              </Link>
              <button onClick={() => { logout(); closeDropdown(); }}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </>
) : (
  <button className="login-button" onClick={toggleLogin}>
    Iniciar Sesión
  </button>
)}

      </nav>

      <div
        className={`login-sidebar ${isLoginOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <LoginForm onClose={closeLogin} /> {/* Asegúrate de pasar onClose aquí */}
      </div>

      {isLoginOpen && <div className="backdrop" onClick={closeLogin}></div>}
    </>
  );
}

export default Navbar;
