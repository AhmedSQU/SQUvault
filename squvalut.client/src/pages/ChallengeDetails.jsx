/* eslint-disable no-unused-vars */
// File: src/pages/ChallengeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getChallengeById, submitChallengeFlag } from '../services/challengeService';

const ChallengeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [flag, setFlag] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        // Check if the user is logged in using cookies
        const username = Cookies.get('username');
        if (!username) {
            // If not authenticated, redirect to login page
            navigate('/login', { replace: true });
            return;
        }

        const fetchChallenge = async () => {
            try {
                const data = await getChallengeById(id);
                setChallenge(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch challenge:", error);
                setErrorMessage("Failed to load challenge details. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchChallenge();
    }, [id, navigate]);

    const handleSubmitFlag = async (e) => {
        e.preventDefault();

        try {
            const response = await submitChallengeFlag(id, flag);
            if (response.success && response.solved) {
                setFeedback("Correct! Challenge marked as solved.");
                setIsSolved(true);
            } else {
                setFeedback("Incorrect flag. Try again!");
            }
        } catch (error) {
            console.error("Failed to submit flag:", error);
            setFeedback("There was an error submitting your flag.");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (errorMessage) return <p className="text-danger">{errorMessage}</p>;

    const difficultyLevels = ["Easy", "Medium", "Hard"];
    const difficultyColors = ["success", "warning", "danger"];

    return (
        <div className="container mt-5">
            {challenge && (
                <div className="card shadow-lg mb-4">
                    <div className="card-header bg-primary text-white">
                        <h2 className="mb-0">{challenge.title}</h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text mb-3">{challenge.description}</p>
                        <div className="d-flex align-items-center mb-4">
                            <span className={`badge bg-${difficultyColors[challenge.difficulty]} me-2`}>
                                Difficulty: {difficultyLevels[challenge.difficulty]}
                            </span>
                        </div>

                        {/* Check if FilePath exists and render the download button */}
                        {challenge.filePath && (
                            <div className="mb-3">
                                <a
                                    href={`https://localhost:44326/api/Challenges/download${challenge.filePath}`}
                                    className="btn btn-info"
                                    download
                                >
                                    Download File
                                </a>
                            </div>
                        )}

                        {isSolved ? (
                            <p className="text-success fw-bold">You have already solved this challenge!</p>
                        ) : (
                            <form onSubmit={handleSubmitFlag} className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="flag" className="form-label">Submit Flag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="flag"
                                        value={flag}
                                        onChange={(e) => setFlag(e.target.value)}
                                        placeholder="Enter flag here"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        )}
                        {feedback && (
                            <div className={`alert ${isSolved ? 'alert-success' : 'alert-danger'} mt-3`}>
                                {feedback}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChallengeDetails;
