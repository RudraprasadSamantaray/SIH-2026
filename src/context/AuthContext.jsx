import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultUsersByRole = {
  engineer: {
    email: 'engineer@ecometrix.ai',
    role: 'engineer',
    name: 'Alex Rivera',
    material: 'Aluminium',
    plant: 'Plant A-12',
    isAuthenticated: true
  },
  auditor: {
    email: 'auditor@ecometrix.ai',
    role: 'auditor',
    name: 'Dr. Elena Vance',
    material: 'Aluminium',
    plant: 'Plant A-12',
    isAuthenticated: true
  },
  admin: {
    email: 'admin@ecometrix.ai',
    role: 'admin',
    name: 'Marcus Vance',
    material: 'All Plants',
    plant: 'EcoMetrix Global',
    isAuthenticated: true
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecometrix_user');
    return saved ? JSON.parse(saved) : defaultUsersByRole.engineer;
  });

  const login = (email, password, role) => {
    const selectedRole = role ? role.toLowerCase() : 'engineer';
    const baseDefault = defaultUsersByRole[selectedRole] || defaultUsersByRole.engineer;

    const newUser = {
      ...baseDefault,
      email: email || baseDefault.email,
      role: selectedRole,
      name: email && email.includes('@')
        ? email.split('@')[0].replace('.', ' ').toUpperCase()
        : baseDefault.name,
      isAuthenticated: true
    };
    setUser(newUser);
    localStorage.setItem('ecometrix_user', JSON.stringify(newUser));
    return newUser;
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
