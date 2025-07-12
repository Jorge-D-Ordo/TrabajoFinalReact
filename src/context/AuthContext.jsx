import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rol, setRol] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch('/datos/usuarios.json');
      if (!res.ok) throw new Error('No se pudo cargar usuarios');
      const users = await res.json();

      const user = users.find(u => u.email === email && u.clave === password);
      if (!user) return null;

      setIsAuthenticated(true);
      setRol(user.rol);
      setUsuario(user);
      return user;
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      return null;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRol(null);
    setUsuario(null);
    toast.info('👋 Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, rol, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);