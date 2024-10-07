// frontend/src/components/Navbar.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout for both admin and client
  const handleLogout = () => {
    if (userRole === 'admin') {
      localStorage.removeItem('token');
    } else if (userRole === 'client') {
      localStorage.removeItem('clientToken');
    }
    setUserRole(null);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link to="/" className="text-white text-2xl font-bold">
          SaaS Contact Form
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {/* <Link to="/" className="text-white hover:text-blue-300 transition">
            Home
          </Link> */}

          {/* Client-Specific Links */}
          {userRole === 'client' && (
            <>
              <Link to="/client/contact-form?clientDomain=client1.com" className="text-white hover:text-blue-300 transition">
                Contact Form
              </Link>
              <Link to="/client/dashboard" className="text-white hover:text-blue-300 transition">
                Dashboard
              </Link>
            </>
          )}

          {/* Admin-Specific Links */}
          {userRole === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="text-white hover:text-blue-300 transition">
                Admin Dashboard
              </Link>
              <Link to="/admin/clients" className="text-white hover:text-blue-300 transition">
                Manage Clients
              </Link>
              <Link to="/admin/submissions" className="text-white hover:text-blue-300 transition">
                Form Submissions
              </Link>
            </>
          )}

          {/* Login / Logout */}
          {userRole ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-300 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/admin" className="text-white hover:text-blue-300 transition">
                Admin Login
              </Link>
              <Link to="/client/login" className="text-white hover:text-blue-300 transition">
                Client Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-500">
            Home
          </Link>

          {/* Client-Specific Links */}
          {userRole === 'client' && (
            <>
              <Link to="/client/contact-form" className="block px-4 py-2 text-white hover:bg-blue-500">
                Contact Form
              </Link>
              <Link to="/client/dashboard" className="block px-4 py-2 text-white hover:bg-blue-500">
                Dashboard
              </Link>
            </>
          )}

          {/* Admin-Specific Links */}
          {userRole === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="block px-4 py-2 text-white hover:bg-blue-500">
                Admin Dashboard
              </Link>
              <Link to="/admin/clients" className="block px-4 py-2 text-white hover:bg-blue-500">
                Manage Clients
              </Link>
              <Link to="/admin/submissions" className="block px-4 py-2 text-white hover:bg-blue-500">
                Form Submissions
              </Link>
            </>
          )}

          {/* Login / Logout */}
          {userRole ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/admin" className="block px-4 py-2 text-white hover:bg-blue-500">
                Admin Login
              </Link>
              <Link to="/client/login" className="block px-4 py-2 text-white hover:bg-blue-500">
                Client Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
