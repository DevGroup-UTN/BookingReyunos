import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restaurar sesión desde localStorage
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Guarda la información del usuario
    localStorage.setItem('user', JSON.stringify(userData)); // Opcional: persistir en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Opcional: limpiar localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
