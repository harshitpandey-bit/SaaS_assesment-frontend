// frontend/src/pages/ClientManagement.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    domain: '',
    logo: '',
    heading: '',
    email: '',
    username: '',
    password: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://saas-assesment-backend.onrender.com/api/admin/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        toast.error('Failed to fetch clients');
      }
    };

    fetchClients();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addClient = async () => {
    try {
      await axios.post('https://saas-assesment-backend.onrender.com/api/admin/clients', newClient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Client added successfully');
      // Fetch the updated list of clients
      setClients([...clients, newClient]);
    } catch (error) {
      toast.error('Failed to add client');
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`https://saas-assesment-backend.onrender.com/api/admin/clients?id=${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client._id !== clientId));
      toast.success('Client deleted successfully');
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Clients</h1>
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Add New Client</h2>
        <input name="domain" onChange={handleInputChange} placeholder="Domain" className="block mb-2 p-2 border border-gray-300" />
        <input name="logo" onChange={handleInputChange} placeholder="Logo URL" className="block mb-2 p-2 border border-gray-300" />
        <input name="heading" onChange={handleInputChange} placeholder="Heading" className="block mb-2 p-2 border border-gray-300" />
        <input name="email" onChange={handleInputChange} placeholder="Email" className="block mb-2 p-2 border border-gray-300" />
        <input name="username" onChange={handleInputChange} placeholder="Username" className="block mb-2 p-2 border border-gray-300" />
        <input name="password" onChange={handleInputChange} placeholder="Password" className="block mb-2 p-2 border border-gray-300" />
        <button onClick={addClient} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
          Add Client
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Client List</h2>
        <ul className="space-y-2">
          {clients.map((client, index) => (
            <li key={index} className="border p-4 flex justify-between items-center">
              <span>{client.username}</span>
              <span>{client.domain}</span>
              <span>{client.heading}</span>
              <span>{client.email}</span>
              <button
                onClick={() => deleteClient(client._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientManagement;
