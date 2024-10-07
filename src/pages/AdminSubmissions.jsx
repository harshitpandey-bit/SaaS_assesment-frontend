// frontend/src/pages/AdminSubmissions.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://saas-assesment-backend.onrender.com/api/clients/submissions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(response.data.data);
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch submissions');
      }
    };

    fetchSubmissions();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Form Submissions</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Email</th>
            <th className="border border-gray-300 p-4">Message</th>
            <th className="border border-gray-300 p-4">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">No submissions found.</td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border border-gray-300 p-4">{submission.name}</td>
                <td className="border border-gray-300 p-4">{submission.email}</td>
                <td className="border border-gray-300 p-4">{submission.message}</td>
                <td className="border border-gray-300 p-4">{new Date(submission.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AdminSubmissions;
