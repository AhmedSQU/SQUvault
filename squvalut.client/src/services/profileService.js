// File: src/services/profileService.js
import axios from 'axios';

const API_URL = 'https://localhost:44326/api/users/profile';

export const getProfile = async (username) => {
    try {
        const response = await axios.get(`${API_URL}?username=${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
};
