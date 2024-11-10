/* eslint-disable no-unused-vars */
// File: src/pages/ChallengesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getChallenges } from '../services/challengeService';
import ChallengeList from '../components/ChallengeList';

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by verifying the username cookie
        const username = Cookies.get('username');
        if (!username) {
            // If no cookie is found, redirect to the login page
            navigate('/login', { replace: true });
            return;
        }

        const fetchChallenges = async () => {
            try {
                const data = await getChallenges();
                setChallenges(data || []);
            } catch (error) {
                console.error("Failed to fetch challenges:", error);
                setErrorMessage("Failed to load challenges. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="alert alert-danger text-center my-4">
                {errorMessage}
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center display-4 mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Our Challenges</h1>
            <p className="text-center text-muted mb-5" style={{ fontSize: '1.2rem' }}>
                Test your skills with our handpicked challenges across various difficulty levels.
            </p>
            <ChallengeList challenges={challenges} />
        </div>
    );
};

export default ChallengesPage;
