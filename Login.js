import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/AuthForm/AuthForm.css'; // Corrected path
import { useAuth } from '../context/AuthContext';
import './AuthForm/AuthForm.css';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
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
        
        const { email, password } = formData;
        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const result = await login(formData);
        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            {error && <div className="alert error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
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
                <button type="submit" disabled={loading} className="auth-button">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="auth-footer">
                Don't have an account? <a href="/register">Register here</a>
            </p>
           

        </div>
    );
};

export default Login;