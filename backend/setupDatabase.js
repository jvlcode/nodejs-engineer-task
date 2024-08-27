const fs = require('fs');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: '192.168.29.76',
    user: 'tesuser',
    password: 'test@123',
    database: 'test',
});

// Function to execute SQL statements
const executeSql = (sqlStatements) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlStatements, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Read the SQL file and execute the SQL statements
const setupDatabase = async () => {
    try {
        console.log('Connecting to the database...');
        connection.connect();

        console.log('Reading SQL file...');
        const sqlFile = 'data.sql'; // Path to your SQL script
        const sqlScript = fs.readFileSync(sqlFile, 'utf8');
        
        // Split the SQL script into individual statements using ';' delimiter
        const sqlStatements = sqlScript.split(';').filter(statement => statement.trim() !== '');

        console.log('Executing SQL statements...');
        for (const statement of sqlStatements) {
            if (statement.trim().length === 0) {
                continue;
            }
            await executeSql(statement);
            console.log('Executed statement:', statement.trim());
        }

        console.log('Database setup complete.');
    } catch (err) {
        console.error('Error executing SQL script:', err);
    } finally {
        connection.end(); // Close the connection
        console.log('Database connection closed.');
    }
};

// Run the setup script
setupDatabase();
