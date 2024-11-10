/* eslint-disable no-unused-vars */
// File: src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setUsername }) => {
    const [localUsername, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Helper function to validate the username
    const isValidUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]{5,15}$/; // Only alphanumeric, between 5-15 characters
        return usernameRegex.test(username);
    };

    // Helper function to validate the password
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least one uppercase, one lowercase, minimum 8 characters
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (localUsername.length < 5 || localUsername.length > 15 || !/^[a-zA-Z0-9]+$/.test(localUsername)) {
            setErrorMessage("Username must be 5-15 characters long and contain only alphanumeric characters.");
            return;
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setErrorMessage("Password must be at least 8 characters long and contain both uppercase and lowercase letters.");
            return;
        }

        try {
            const response = await axios.post('https://localhost:44326/api/auth/register', {
                username: localUsername,
                password,
            });

            if (response.data && response.data.id) {
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('username', response.data.username);
                setUsername(response.data.username);
                setSuccessMessage("Registration successful! Welcome ...");
                setTimeout(() => {
                    navigate('/challenges');
                }, 2000);
            } else {
                setErrorMessage("Registration completed but some data is missing. Please contact support.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );
        }
    };


    return (
        <div className="container mt-5">
            <h1>Register</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={localUsername}
                        onChange={(e) => setLocalUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

// Define prop types for RegisterPage
RegisterPage.propTypes = {
    setUsername: PropTypes.func.isRequired,
};

export default RegisterPage;
