// src/pages/LoginPage.js
import React, { useState, useContext, useEffect } from 'react'; // <-- Import useEffect
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(AuthContext); // <-- Get user from context
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to hold error messages

  // This effect hook handles the automatic redirect
  useEffect(() => {
    // If the user object exists, it means they are logged in.
    // Redirect them away from the login page to the dashboard.
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]); // This effect runs whenever the 'user' state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await login(email, password);
      // We no longer navigate here. The useEffect hook will handle it.
    } catch (err) {
      // Set the error message from the backend to display to the user
      setError(err.response?.data?.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Login to continue your journey with PsyNova.</p>

        {/* Display error message if it exists */}
        {error && <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '6px' }}>{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Login</button>
        <p className="form-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;