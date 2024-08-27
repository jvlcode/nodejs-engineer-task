const db = require('./db');

// Get user by username
const getUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows;
};

// Create a new user
const createUser = async (username, password) => {
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

// Update failed login attempts
const updateFailedAttempts = async (username) => {
    await db.query('UPDATE users SET failed_attempts = failed_attempts + 1 WHERE username = ?', [username]);
};

// Reset failed login attempts
const resetFailedAttempts = async (username) => {
    await db.query('UPDATE users SET failed_attempts = 0 WHERE username = ?', [username]);
};

// Lock a user account
const lockUser = async (username, lockUntil) => {
    await db.query('UPDATE users SET is_locked = true, lock_until = ? WHERE username = ?', [lockUntil, username]);
};
// Unlocak a user account
const unlockUser = async (username, lockUntil) => {
    await db.query('UPDATE users SET is_locked = false, lock_until = null WHERE username = ?', [username]);
};

module.exports = {
    getUserByUsername,
    createUser,
    updateFailedAttempts,
    resetFailedAttempts,
    lockUser,
    unlockUser
};
