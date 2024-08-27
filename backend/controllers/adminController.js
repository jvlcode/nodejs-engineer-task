const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');

const kickoutUser = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Delete all tokens for the user
        await tokenModel.deleteAllTokens(username);

        const user = await userModel.getUserByUsername(username);

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: `All tokens for user ${username} have been invalidated.` });
    } catch (err) {
        next(err);
    }
};

module.exports = { kickoutUser };
