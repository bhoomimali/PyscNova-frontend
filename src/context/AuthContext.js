// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// This is the URL of your live backend.
// In development, it will be undefined, and axios will use the "proxy".
// In production (on Vercel), it will be 'https://psynova-backend.onrender.com'.
const API_URL = process.env.REACT_APP_API_URL || '';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (by checking localStorage)
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  // Login function - UPDATED
  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  // Register function - UPDATED
  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/api/users/register`, { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};