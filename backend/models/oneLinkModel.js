const mysql = require('mysql2/promise'); 
const db = require('./db');

// insert a new one-time link
const insertLink = async (token, username, expiresAt) => {
    const sql = `INSERT INTO one_time_links (token, username, expires_at) VALUES (?, ?, ?)`;
    try {
        const [results] = await db.query(sql, [token, username, expiresAt]);
        return results;
    } catch (err) {
        throw err;
    }
};

//  get a one-time link by token
const getLinkByToken = async (token) => {
    const sql = `SELECT * FROM one_time_links WHERE token = ? AND expires_at > NOW()`;
    try {
        const [results] = await db.query(sql, [token]);
        return results[0]; // Return the first result
    } catch (err) {
        throw err;
    }
};

// delete a one-time link by token
const deleteLink = async (token) => {
    const sql = `DELETE FROM one_time_links WHERE token = ?`;
    try {
        const [results] = await db.query(sql, [token]);
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    insertLink,
    getLinkByToken,
    deleteLink
};
