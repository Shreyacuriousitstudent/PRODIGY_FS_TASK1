import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">AuthApp</Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register" className="navbar-link">Register</Link>
                            <Link to="/login" className="navbar-link">Login</Link>
                        </>
                    ) : (
                        <>console.log("Navigation success");
                            <Link to="/profile" className="navbar-link">Profile</Link>
                            <button onClick={logout} className="navbar-link logout-btn">Logout</button>
                            
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;