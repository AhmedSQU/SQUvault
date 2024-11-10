/* eslint-disable no-unused-vars */
// File: src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getProfile } from '../services/profileService';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        solvedChallengesCount: 0,
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            // Get the username from cookies
            const username = Cookies.get('username');

            // If the cookie is not found, redirect to login page
            if (!username) {
                window.location.href = '/login';
                return;
            }

            try {
                // Fetch the profile using the username from the cookie
                const profile = await getProfile(username);
                const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges')) || [];

                setUserData({
                    id: profile.id,
                    username: profile.username,
                    solvedChallengesCount: solvedChallenges.length
                });
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
                setErrorMessage("Failed to load profile data.");
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4" style={{ color: '#007bff', fontWeight: 'bold' }}>Profile</h1>
            </div>

            {errorMessage && (
                <div className="alert alert-danger text-center my-4">
                    {errorMessage}
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <h2 className="card-title mb-3" style={{ color: '#333' }}>Welcome, {userData.username}!</h2>
                            <p className="text-muted">View and track your progress on SquVault.</p>
                        </div>
                    </div>

                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h4 className="card-subtitle mb-3 text-muted">User Information</h4>
                            <p><strong>ID:</strong> {userData.id}</p>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Challenges Solved:</strong> {userData.solvedChallengesCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
