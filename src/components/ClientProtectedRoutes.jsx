// frontend/src/components/ClientProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ClientProtectedRoute = ({ children }) => {
  const clientToken = localStorage.getItem('clientToken'); // Get the client token from localStorage

  // If token is not available, redirect to the client login page
  if (!clientToken) {
    return <Navigate to="/client/login" />;
  }

  // If token is available, render the child component
  return children;
};

export default ClientProtectedRoute;
