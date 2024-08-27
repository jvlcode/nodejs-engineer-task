const crypto = require('crypto');
const oneLinkModel = require('../models/oneLinkModel');
const userModel = require('../models/userModel');
const configModel = require('../models/configModel');
const { generateToken } = require('./authController');

const generateLink = async (req, res, next) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // get validity from the config
        const configResult = await configModel.getConfig('LINK_VALIDITY');
        const linkValidity = parseInt(configResult[0].value, 10);

        // get user by username
        const userResult = await userModel.getUserByUsername(username);
        const user = userResult[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a link token for the link
        const linkToken = crypto.randomBytes(16).toString('hex');
        const link = `http://localhost:3000/verify-link?token=${linkToken}`;

        // insert token into the database
        await oneLinkModel.insertLink(linkToken, username, new Date(Date.now() + linkValidity * 60 * 1000));

        res.json({ link });
    } catch (err) {
        next(err);
    }
};

const verifyLink = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        // fetch the token from the database
        const tokenResult = await oneLinkModel.getLinkByToken(token);

        if (!tokenResult) {
            return res.status(401).json({ message: 'Invalid or expired link' });
        }

        // delete the token from the database
        await oneLinkModel.deleteLink(token);

        const validToken = await generateToken(tokenResult.username);

        res.json({ token: validToken });
    } catch (err) {
        next(err);
    }
};

module.exports = { generateLink, verifyLink };
