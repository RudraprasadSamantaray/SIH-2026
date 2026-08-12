import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecometrix_user');
    return saved ? JSON.parse(saved) : {
      email: 'engineer@ecometrix.ai',
      role: 'engineer',
      name: 'Alex Rivera',
      material: 'Aluminium',
      plant: 'Plant A-12',
      isAuthenticated: true
    };
  });

  const login = (email, password, role) => {
    const newUser = {
      email,
      role: role || 'engineer',
      name: email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : 'Industrial Engineer',
      material: 'Aluminium',
      plant: 'Plant A-12',
      isAuthenticated: true
    };
    setUser(newUser);
    localStorage.setItem('ecometrix_user', JSON.stringify(newUser));
  };

  const logout = () => {
    const unauthUser = { isAuthenticated: false };
    setUser(unauthUser);
    localStorage.setItem('ecometrix_user', JSON.stringify(unauthUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
