const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL credentials
        user: 'root',
        password: 'Dorian56709',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee tracker database.')
);

module.exports = db;