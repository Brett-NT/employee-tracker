const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//Function to call when asked to get all roles
const getRoles = () => {
    // Get all roles
    router.get('/roles', (req, res) => {
        const sql = `SELECT * FROM candidates`;

        db.query(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
            console.table(rows);
        });
    });
}

// Function to call for creating a new role
const newRole = () => {
    router.post('/role', (req, res) => {
        const errors = inputCheck(
            body,
            'first_name',
            'last_name',
            'department_id',
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `INSERT INTO roles (first_name, last_name, role_id)
                    VALUES (?,?,?)`;
        const params = [body.first_name, body.last_name, body.role_id];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    });
}

module.exports = { getRoles, newRole };