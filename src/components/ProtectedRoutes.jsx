// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get the admin token from localStorage

  // If token is not available, redirect to the admin login page
  if (!token) {
    return <Navigate to="/admin" />;
  }

  // If token is available, render the child component
  return children;
};

export default ProtectedRoute;
