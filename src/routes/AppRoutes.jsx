import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SubmitIdea from '../pages/SubmitIdea';
import IdeaDetails from '../pages/IdeaDetails';
import Profile from '../pages/Profile';
import Results from '../pages/Results';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageIdeas from '../pages/admin/ManageIdeas';
import ResultsManagement from '../pages/admin/ResultsManagement';

import { useAuth } from '../context/AuthContext';

// Protected Admin Route wrapper
const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

// Protected Student/User Route wrapper
const ProtectedUserRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Always Renders Landing Page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Student Portal & Workflow */}
      <Route
        path="/dashboard"
        element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/submit"
        element={
          <ProtectedUserRoute>
            <SubmitIdea />
          </ProtectedUserRoute>
        }
      />
      <Route path="/ideas/:ideaId" element={<IdeaDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/results" element={<Results />} />

      {/* Admin Portal & Workflow */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/manage"
        element={
          <ProtectedAdminRoute>
            <ManageIdeas />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/publish"
        element={
          <ProtectedAdminRoute>
            <ResultsManagement />
          </ProtectedAdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
