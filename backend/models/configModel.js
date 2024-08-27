const db = require('./db');

// Get a configuration value by key
const getConfig = async (key) => {
    const [rows] = await db.query('SELECT value FROM config WHERE `key` = ?', [key]);
    return rows;
};

module.exports = {
    getConfig
};
