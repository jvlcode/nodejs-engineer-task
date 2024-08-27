import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyLink } from '../api';

const VerifyLink = () => {
    const [token, setToken] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const location = useLocation();

    useEffect(() => {
        // extract query parameter from the URL
        const getTokenFromUrl = () => {
            const params = new URLSearchParams(location.search);
            const tokenFromUrl = params.get('token');
            if (tokenFromUrl) {
                setToken(tokenFromUrl);
            }
        };

        getTokenFromUrl();
    }, [location.search]);

    const handleVerifyLink = async () => {
        try {
            const response = await verifyLink(token);
            setResult(`Token Verified. New JWT: ${response.data.token}`);
            navigate('/dashboard'); // Redirect to the dashboard component
        } catch (err) {
            setError('Invalid or expired link.');
            setResult('');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Verify One-Time Link</h2>
            <div className="mb-3">
                <label htmlFor="token" className="form-label">Token</label>
                <input
                    type="text"
                    id="token"
                    className="form-control"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
            </div>
            <button onClick={handleVerifyLink} className="btn btn-primary">Verify Token</button>
            {result && <div className="mt-3 alert alert-success">{result}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
        </div>
    );
};

export default VerifyLink;
