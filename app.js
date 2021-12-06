const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

//404 error response
app.use((req, res) => {
    res.status(404).end();
});



const startQuestion = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please select an option',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ])
        .then((answer) => {
            switch (answer.options) {
                case 'View All Departments':
                    console.log('You want to view all departments.');
                    getDepartments();
                    break;

                case 'View All Roles':
                    console.log('You want to view all roles.');
                    getRoles();
                    break;

                case 'View All Employees':
                    console.log('You want to view all employees.');
                    getEmployees();
                    break;

                case 'Add a Department':
                    console.log('You want to add a department.');
                    addDepartment();
                    break;

                case 'Add a Role':
                    console.log('You want to add a role.');
                    addRole();
                    break;

                case 'Add an Employee':
                    console.log('You want to add an employee.');
                    addEmployee();
                    break;

                case 'Update an Employee Role':
                    console.log('You want to update an employee.');
                    updateEmployee();
                    break;

            }
        })
};

// Get all Departments
const getDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    });
}

const getRoles = () => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    });
}

const getEmployees = () => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    });
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of your new department?',
            validate: departmentNameInput => {
                if (departmentNameInput) {
                    return true;
                } else {
                    console.log('Please provide a name for your new department.');
                    return false;
                }
            }
        }
    ]).then(answer => {
        const sql = `INSERT INTO Departments (name)
        VALUES (?)`;
        const params = [answer.departmentName];

        db.query(sql, params, (err, result) => {
            console.log('New department has been added.');
            startQuestion();
        });
    })
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of your new role?',
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log('Please provide a name for your new role.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this new role?',
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                    return true;
                } else {
                    console.log('Please provide a salary amount for this role.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is th id number for the department this role belongs to?',
            validate: roleDepartmentInput => {
                if (roleDepartmentInput) {
                    return true;
                } else {
                    console.log('Please provide the department id for this role.');
                    return false;
                }
            }
        }
    ]).then(answer => {
        const sql = `INSERT INTO roles (name, salary, department_id)
        VALUES (?,?,?)`;
        const params = [answer.roleName, answer.salary, answer.departmentId];

        db.query(sql, params, (err, result) => {
            console.log('New role has been added.');
            startQuestion();
        });
    });
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of this new employee?',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Please provide the first name of this employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of this new employee?',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Please provide the last name of this employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the id number of this employees role?',
            validate: roleIdInput => {
                if (roleIdInput) {
                    return true;
                } else {
                    console.log('Please provide the role id number of this employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the id number of this employees manager?',
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log('Please provide the id number of this employees manager.');
                    return false;
                }
            }
        }
    ]).then(answer => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
        const params = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];

        db.query(sql, params, (err, result) => {
            console.log('New employee has been added.');
            startQuestion();
        });
    });

}

const updateEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the id number of the employee you wish to update?'
        },
        {
            type: 'input',
            name: 'updateRole',
            message: 'What is the new role id number for this employee?'
        }
    ]).then(answer => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [answer.updateRole, answer.employeeId];
    db.query(sql, params, (err, result) => {
        console.log('New role has been updated for this employee.');
        startQuestion();
    });
    })

}

db.connect(function (err) {
    if (err) throw err;
    console.log('Connected');
    startQuestion();
});