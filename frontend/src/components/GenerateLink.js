import React, { useState } from 'react';
import { generateLink } from '../api';

const GenerateLink = () => {
    const [username, setUsername] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const handleGenerateLink = async () => {
        try {
            const response = await generateLink(username);
            setLink(response.data.link);
            setError('');
        } catch (err) {
            setError('Failed to generate link. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Generate One-Time Link</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <button onClick={handleGenerateLink} className="btn btn-primary">Generate Link</button>
            {link && <div className="mt-3 alert alert-success">Generated Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
        </div>
    );
};

export default GenerateLink;
