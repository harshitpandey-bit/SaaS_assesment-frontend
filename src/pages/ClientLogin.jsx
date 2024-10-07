// frontend/src/pages/ClientLogin.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserRole } = useContext(AuthContext); // Access setUserRole from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://saas-assesment-backend.onrender.com/api/clients/login', {
        username,
        password,
      });

      if (response.data.token) {
        // Store token and set user role to "client"
        localStorage.setItem('clientToken', response.data.token);
        setUserRole('client'); // Update userRole in context
        toast.success('Login successful!');
        navigate('/client/dashboard');
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Client Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ClientLogin;
