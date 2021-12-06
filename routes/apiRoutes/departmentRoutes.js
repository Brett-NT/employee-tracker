const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all Departments
router.get('/Departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

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
    console.table(departments);
});

router.post('/department', (req, res) => {
    const errors = inputCheck(
        body,
        'department_name',
        'department_id',
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO Departments (department_name, department_id)
                    VALUES (?,?,?)`;
    const params = [body.department_name, body.department_id];

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

module.exports = router;