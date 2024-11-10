/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = ({ setUsername }) => {
    const [username, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:44326/api/Auth/login', { username, password });

            // Set cookie instead of localStorage
            Cookies.set('username', response.data.username, { secure: true, sameSite: 'Strict', expires: 1 });

            setUsername(response.data.username);
            navigate('/challenges');
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid username or password';
            setErrorMessage(message);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setLocalUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

LoginPage.propTypes = {
    setUsername: PropTypes.func.isRequired,
};

export default LoginPage;
