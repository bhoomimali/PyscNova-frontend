// src/pages/RegisterPage.js
import React, { useState, useContext, useEffect } from 'react'; // <-- Import useEffect
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, register } = useContext(AuthContext); // <-- Get user from context
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // This effect hook handles the automatic redirect
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password);
      // We no longer navigate here. The useEffect hook will handle it.
    } catch (err) {
      setError(err.response?.data?.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <p>Join PsyNova to begin your path to mental wellness.</p>

        {error && <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '6px' }}>{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;