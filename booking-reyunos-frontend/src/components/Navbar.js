import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './loginForms';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menú móvil

  const toggleLogin = (event) => {
    event.stopPropagation();
    setIsLoginOpen(!isLoginOpen);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Alterna visibilidad del menú móvil
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false); // Cierra el menú móvil
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <img
            className="utn"
            src="https://files-public-web.s3-us-west-2.amazonaws.com/1472/company/library/user/51742008549581e7db8aba6fb75df56232d673d813.png"
            alt="Logo"
          />
        </div>

        {/* Botón para menú móvil */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>

        {/* Menú Principal */}
        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Inicio</Link>
          <Link to="/accommodations" onClick={closeMobileMenu}>Alojamientos</Link>
          <Link to="/programas" onClick={closeMobileMenu}>Programas</Link>
          <Link to="/infraestructura" onClick={closeMobileMenu}>Infraestructura</Link>
          <Link to="/contacto" onClick={closeMobileMenu}>Contacto</Link>
        </div>

        {user ? (
          <div className="user-info">
            <span onClick={toggleDropdown} className="user-name">
              <FontAwesomeIcon icon={faUser} />
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {user.role === 'OWNER' && (
                  <>
                    <Link to="/dashboard" onClick={closeDropdown}>Panel de Control</Link>
                    <Link to="/myAccommodations" onClick={closeDropdown}>Mis Alojamientos</Link>
                    <button onClick={() => { logout(); closeDropdown(); }}>Cerrar Sesión</button>
                  </>
                )}
                {user.role === 'ADMIN' && (
                  <>
                    <Link to="/dashboard" onClick={closeDropdown}>Panel de Control</Link>
                    <button onClick={() => { logout(); closeDropdown(); }}>Cerrar Sesión</button>
                  </>
                )}
                {user.role === 'GUEST' && (
                  <>
                    <Link to="/dashboard" onClick={closeDropdown}>Panel de Control</Link>
                    <Link to="/myBookings" onClick={closeDropdown}>Mis Reservas</Link>
                    <button onClick={() => { logout(); closeDropdown(); }}>Cerrar Sesión</button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <button className="login-button" onClick={toggleLogin}>
              Iniciar Sesión
            </button>
            <button className="mobile-login-button" onClick={toggleLogin}>
                <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
          
        )}
      </nav>

      <div
        className={`login-sidebar ${isLoginOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <LoginForm onClose={closeLogin} />
      </div>

      {isLoginOpen && <div className="backdrop" onClick={closeLogin}></div>}
    </>
  );
}

export default Navbar;
