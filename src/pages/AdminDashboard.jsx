// frontend/src/pages/AdminDashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to="/admin/clients"
          className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
        >
          Manage Clients
        </Link>
        <Link
          to="/admin/submissions"
          className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition"
        >
          View Form Submissions
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
