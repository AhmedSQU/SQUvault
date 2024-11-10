/* eslint-disable no-unused-vars */
// File: src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported globally
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChallengesPage from './pages/ChallengeList';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChallengeDetails from './pages/ChallengeDetails';
import ProfilePage from './pages/ProfilePage';

const App = () => {
    const [username, setUsername] = useState(localStorage.getItem('username')); // Initialize from localStorage

    return (
        <Router>
            <Layout username={username} setUsername={setUsername}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route
                        path="/login"
                        element={<LoginPage setUsername={setUsername} />} // Pass setUsername to LoginPage
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage setUsername={setUsername} />} // Pass setUsername to RegisterPage
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/challenges/:id" element={<ChallengeDetails />} />
                    <Route
                        path="*"
                        element={<div style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</div>}
                    />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
