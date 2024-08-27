import React, { useEffect, useState } from 'react';
import { fetchTime } from '../api';

const Dashboard = () => {
    const [time, setTime] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTime();
                setTime(response.data.currentTime);
            } catch (err) {
                setError('Failed to fetch time.');
            }
        };

        fetchData();
    }, []);

    return  <div className="container mt-4">
            <h2>Dashboard</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {time ? (
                <div className="alert alert-success">Current Time: {time}</div>
            ) : (
                <div className="alert alert-info">Loading...</div>
            )}
        </div>
    
};

export default Dashboard;
