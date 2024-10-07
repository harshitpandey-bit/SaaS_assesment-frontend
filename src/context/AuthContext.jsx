// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // "admin", "client", or null

  useEffect(() => {
    // Check if an admin or client token exists in localStorage
    const adminToken = localStorage.getItem('token');
    const clientToken = localStorage.getItem('clientToken');

    if (adminToken) {
      setUserRole('admin');
    } else if (clientToken) {
      setUserRole('client');
    } else {
      setUserRole(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
