const db = require('./db');

// insert a new token
const insertToken = async (token, username, expiresAt) => {
    await db.query('INSERT INTO tokens (token, username, expires_at) VALUES (?, ?, ?)', [token, username, expiresAt]);
};

// get token by token value
const getTokenByValue = async (token) => {
    const [rows] = await db.query('SELECT * FROM tokens WHERE token = ?', [token]);
    console.log(token,'token');
    return rows;
};

// delete token by token value
const deleteToken = async (token) => {
    await db.query('DELETE FROM tokens WHERE token = ?', [token]);
};

// gelete all tokens for a given username
const deleteAllTokens = async (username) => {
    await db.query('DELETE FROM tokens WHERE username = ?', [username]);
};

module.exports = {
    insertToken,
    getTokenByValue,
    deleteToken,
    deleteAllTokens 
};
