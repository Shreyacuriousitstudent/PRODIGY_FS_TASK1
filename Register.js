import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/AuthForm/AuthForm.css'; // Corrected path
import { useAuth } from '../context/AuthContext';
import './AuthForm/AuthForm.css';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
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
        
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const result = await register(formData);
        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            {error && <div className="alert error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>  if (formData.password !== formData.confirmPassword)                 
  setError("Passwords do not match");
  setLoading(false);
  return;
  </div>
                <button type="submit" disabled={loading} className="auth-button">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};
export default Register;