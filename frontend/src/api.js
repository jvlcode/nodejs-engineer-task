import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:8000';

export const registerUser = async (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    const result = response.data;
    localStorage.setItem('authToken', result.token);
};

export const generateLink = async (username) => {
return axios.post(`${API_URL}/link/generate`, { username });
};

export const verifyLink = async (token) => {
    return axios.get(`${API_URL}/link/verify`, { params: { token } });
};

export const fetchTime = async () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        // Set the Authorization header with the token
        const response = await axios.get(`${API_URL}/time`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
