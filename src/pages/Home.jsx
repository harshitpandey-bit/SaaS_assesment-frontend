// frontend/src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Our Contact Form System</h1>
      <p className="text-lg text-center mb-6">
        A simple and customizable contact form solution for your business needs.
      </p>
      <div className="flex flex-col space-y-4">
        <Link to="/client1" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition">
          Go to Client Contact Form
        </Link>
        <Link to="/admin" className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition">
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
