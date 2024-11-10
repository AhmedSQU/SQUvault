/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/SquVault_Logo.png';
import '../styles/styles.css';

const Layout = ({ children, username, setUsername }) => {
    const navigate = useNavigate();

    // Logout function to clear cookies and navigate to login page
    const handleLogout = async () => {
        try {
            // Call the backend API to clear cookies on the server side
            await fetch('https://localhost:44326/api/Auth/logout', { method: 'POST' });
        } catch (error) {
            console.error("Logout failed:", error);
        }

        // Remove the cookie from the client side
        Cookies.remove('username');

        // Update the state and redirect to login page
        setUsername(null);
        navigate('/login');
    };

    // Function to redirect to the Challenge Write-ups page
    const goToWriteups = () => {
        window.location.href = "https://localhost:44326/ChallengeWriteups";
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#007bff' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="SquVault Logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item me-3">
                                    <Link className="nav-link text-white" to="/">Home</Link>
                                </li>
                                <li className="nav-item me-3">
                                    <Link className="nav-link text-white" to="/challenges">Challenges</Link>
                                </li>
                                <li className="nav-item me-3">
                                    <Link className="nav-link text-white" to="/about">About Us</Link>
                                </li>
                                <li className="nav-item me-3">
                                    <button className="nav-link btn btn-link text-white" onClick={goToWriteups}>
                                        Challenge Write-ups
                                    </button>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                {username ? (
                                    <>
                                        <li className="nav-item me-3">
                                            <Link className="nav-link text-white" to="/profile">{username}</Link>
                                        </li>
                                        <li className="nav-item me-3">
                                            <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item me-3">
                                            <Link className="nav-link text-white" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item me-3">
                                            <Link className="nav-link text-white" to="/register">Register</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container my-4">
                {children}
            </main>

            <footer className="text-center py-4" style={{ backgroundColor: '#333333', color: '#ccc' }}>
                <p>© 2024 SquVault. All rights reserved.</p>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    username: PropTypes.string,
    setUsername: PropTypes.func.isRequired,
};

export default Layout;
