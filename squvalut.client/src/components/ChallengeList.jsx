/* eslint-disable no-unused-vars */
// File: src/components/ChallengeList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ChallengeList = ({ challenges = [] }) => {
    console.log("Challenges data:", challenges);

    const difficultyLevels = ["Easy", "Medium", "Hard"];
    const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '[]').map(id => parseInt(id, 10));

    // Prevent empty or malformed challenges from being rendered
    const validChallenges = challenges.filter(challenge =>
        challenge && challenge.challengeId && challenge.title && challenge.description && typeof challenge.difficulty === 'number'
    );

    const solvedCardStyle = {
        backgroundColor: '#a8e6cf', // Light green
        color: '#1b5e20', // Dark green text
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow for a lifted effect
    };

    const cardStyle = {
        transition: 'transform 0.2s ease-in-out', // Smooth hover transition
    };

    return (
        <div className="row">
            {validChallenges.map((challenge) => {
                const isSolved = solvedChallenges.includes(challenge.challengeId);

                return (
                    <div className="col-md-4 mb-4" key={challenge.challengeId}>
                        <div
                            className="card h-100 shadow-sm"
                            style={isSolved ? solvedCardStyle : cardStyle}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div className="card-body">
                                <h5 className="card-title text-center">{challenge.title}</h5>
                                <p className="card-text text-center">
                                    Difficulty: <span className={`badge bg-${isSolved ? 'success' : 'primary'}`}>
                                        {difficultyLevels[challenge.difficulty]}
                                    </span>
                                </p>
                                <div className="d-flex justify-content-center">
                                    <Link
                                        to={`/challenges/${challenge.challengeId}`}
                                        className={`btn ${isSolved ? 'btn-secondary' : 'btn-primary'} mt-3`}
                                    >
                                        {isSolved ? 'Solved' : 'View Challenge'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Define prop types
ChallengeList.propTypes = {
    challenges: PropTypes.arrayOf(
        PropTypes.shape({
            challengeId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired,
            difficulty: PropTypes.number.isRequired,
        })
    ),
};

export default ChallengeList;
