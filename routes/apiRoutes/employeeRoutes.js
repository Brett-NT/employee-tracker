const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//Function to call when asked to get all employees
const getEmployees = () => {
    // Get all employees
    router.get('/employees', (req, res) => {
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
        });
    });
}

// Function to call for updating an employee
const editEmployee = () => {
    // Update employee data
    router.put('/employee/:id', (req, res) => {
        const errors = inputCheck(req.body, 'party_id');

        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [req.body.role_id, req.params.id];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        });
    });
}

// Function to call for creating a new employee
const newEmployee = () => {
    router.post('/employee', (req, res) => {
        const errors = inputCheck(
            body,
            'first_name',
            'last_name',
            'role_id',
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `INSERT INTO employees (first_name, last_name, role_id)
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

module.exports = { getEmployees, editEmployee, newEmployee };