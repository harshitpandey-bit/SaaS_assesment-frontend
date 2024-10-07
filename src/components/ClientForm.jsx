// frontend/src/components/ClientForm.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientForm = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const token = localStorage.getItem('clientToken')
        const response = await axios.post(`https://saas-assesment-backend.onrender.com/api/clients/client-info`, {
          token
        }
        );
        
        setClientInfo(response.data.client);
        console.log(response.data)
      } catch (error) {
        console.log(error)
        toast.error('Failed to load client data');
      }
    };

    // if (clientDomain) {
      fetchClientInfo();
    // }
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('clientToken')
      await axios.post('https://saas-assesment-backend.onrender.com/api/clients/form-submit', { ...data, token });
      toast.success('Form submitted successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit form');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <img src={clientInfo?.logo} alt={`${clientInfo?.domain} logo`} className="w-32 mx-auto" />
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">{clientInfo?.heading}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-gray-700 mb-1 font-semibold">Name</label>
            <input {...register('name', { required: 'Name is required' })} placeholder="Enter your name" className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 mb-1 font-semibold">Email</label>
            <input {...register('email', { required: 'Email is required' })} type="email" placeholder="Enter your email" className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 mb-1 font-semibold">Message</label>
            <textarea {...register('message', { required: 'Message is required' })} placeholder="Write your message here..." className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`} rows="5" />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            Send Message
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ClientForm;
