const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Attach user info to request object for use in other routes
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
