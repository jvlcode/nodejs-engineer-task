const { authToken } = require('./authController');


const getTime =  async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    const user = await authToken(token);

    if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    //  current server time
    res.json({ currentTime: new Date().toISOString() });
};

module.exports = { getTime };
