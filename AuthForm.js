import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: type === 'register' ? '' : undefined,
    email: '',
    password: '',
    confirmPassword: type === 'register' ? '' : undefined
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await onSubmit(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        {type === 'register' && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {type === 'register' && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      
      <div className="auth-footer">
        {type === 'login' ? (
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        ) : (
          <p>Already have an account? <Link to="/login">Login</Link></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;