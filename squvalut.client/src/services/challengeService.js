// File: src/services/challengeService.js
import axios from 'axios';

const API_URL = 'https://localhost:44326/api/Challenges';

// Function to fetch all challenges
export const getChallenges = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

// Function to fetch a challenge by ID
export const getChallengeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching challenge with id ${id}:`, error);
        throw error;
    }
};

// Function to submit the flag for a challenge
export const submitChallengeFlag = async (id, flag) => {
    try {
        const response = await axios.post(
            `${API_URL}/${id}/submit`,
            { flag },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check if the response is successful and contains the solved flag
        if (response.data.success && response.data.solved) {
            // Retrieve or initialize the solvedChallenges array
            let solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges')) || [];

            // Ensure the challenge ID is added only once
            if (!solvedChallenges.includes(id)) {
                solvedChallenges.push(id);
                localStorage.setItem('solvedChallenges', JSON.stringify(solvedChallenges));
            }
        }

        return response.data;
    } catch (error) {
        console.error("Error submitting flag:", error);
        throw error;
    }
};


// Function to clear localStorage solved challenges (useful for debugging/testing)
export const clearSolvedChallenges = () => {
    localStorage.removeItem('solvedChallenges');
};
