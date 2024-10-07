import ClientProtectedRoute from './components/ClientProtectedRoutes'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import AdminDashboard from './pages/AdminDashboard';
import ClientManagement from './pages/ClientManagement';
import AdminSubmissions from './pages/AdminSubmissions';
import ClientDashboard from './pages/ClientDashboard';
import ClientForm from './components/ClientForm';
import Home from './pages/Home';
import ClientLogin from './pages/ClientLogin';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client/contact-form" element={<ClientForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/client/login" element={<ClientLogin />} />
        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/clients" 
          element={
            <ProtectedRoute>
              <ClientManagement />
            </ProtectedRoute>
          } 
          />
        <Route 
          path="/admin/submissions" 
          element={
            <ProtectedRoute>
              <AdminSubmissions />
            </ProtectedRoute>
          } 
          />
        
        {/* Client Protected Routes */}
        <Route 
          path="/client/dashboard" 
          element={
            <ClientProtectedRoute>
              <ClientDashboard />
            </ClientProtectedRoute>
          } 
        />
      </Routes>
    </Router>
          
  );
}

export default App