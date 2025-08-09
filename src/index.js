// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- WRAP APP */}
       <AuthProvider> {/* <-- WRAP APP */}
      <ThemeProvider> {/* <-- WRAP HERE */}
          <App />
        </ThemeProvider>
      </AuthProvider> {/* <-- WRAP APP */}

    </BrowserRouter>
  </React.StrictMode>
);
