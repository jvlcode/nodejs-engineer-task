// db.js
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: '192.168.29.76',
    user: 'tesuser',
    password: 'test@123',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
