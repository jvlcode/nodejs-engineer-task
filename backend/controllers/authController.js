const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const configModel = require('../models/configModel');
const { SECRET_KEY, TOKEN_EXPIRY } = require('../config');

// Generate a JWT token
const generateToken = async (username) => {
    const token =  await jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    await tokenModel.insertToken(token, username, new Date(Date.now() + 60 * 60 * 1000));
    return token;
};

// Authenticate JWT token

const authToken = async (token) => {
    try {
        // Check if the token is valid in the database
        const tokenInDb = await tokenModel.getTokenByValue(token);
        if (!tokenInDb || tokenInDb.length === 0) {
            return null;
        }
      
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        return null;
    }
};

// Register a new user
const register = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await userModel.getUserByUsername(username);
        
        if (user.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

      
        // Create new user
        await userModel.createUser(username, password);
        // generate token for the user
        const token = await generateToken(username);
        res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
};

// User login
const login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || password.length < 5) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const config = await configModel.getConfig('LOCK_ATTEMPTS');
        const lockAttempts = config[0].value;

        const user = await userModel.getUserByUsername(username);

        if (user.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

        const currentUser = user[0];

        if (currentUser.is_locked) {
            if (currentUser.lock_until > new Date()) {
                return res.status(403).json({ message: 'Account locked' });
            } else {
                await userModel.unlockUser(username);
                await userModel.resetFailedAttempts(username);
            }
        }
       

        // Check password
        const isPasswordValid = password == currentUser.password;

        if (!isPasswordValid) {
            await userModel.updateFailedAttempts(username);
            const updatedUser = await userModel.getUserByUsername(username);
            const updatedCurrentUser = updatedUser[0];

          
            if (updatedCurrentUser.failed_attempts >= lockAttempts) {
                await userModel.lockUser(username, new Date(Date.now() + 1 * 60 * 1000)); // 1 min wait
                return res.status(403).json({ message: 'Account locked due to too many failed attempts' });
            }

            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = await generateToken(username);
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = { login, register, generateToken, authToken };
