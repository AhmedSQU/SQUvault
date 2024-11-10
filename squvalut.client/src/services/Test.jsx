import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'https://localhost:44326/api/Challenges'; // Update to your API URL

export default function Test() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function getChallenges() {
            try {
                const response = await axios.get(API_URL);
                const data = response.data; // No need to use .json(), axios handles it
                setData(data);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }
        getChallenges();
    }, [])

    return (
        <div>
            {data.map((challenge) => (
                <p key={challenge.challengeId}>{challenge.challengeId}</p>
            ))}
        </div>
    )
}
