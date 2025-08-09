// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import CustomCursor from './components/CustomCursor';
// We'll create these new pages in the next step
 import LoginPage from './pages/LoginPage';
 import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ResourcesPage from './pages/ResourcesPage';


// The Aurora Background can be its own component for cleanliness
const AuroraBackground = () => (
  <div className="aurora-background">
    <div className="aurora-shape aurora-shape-1" />
    <div className="aurora-shape aurora-shape-2" />
  </div>
);

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <AuroraBackground />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;