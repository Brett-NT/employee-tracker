const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const { getEmployees, editEmployee, newEmployee } = require('./routes/apiRoutes/employeeRoutes');
const { getRoles, newRole } = require('./routes/apiRoutes/roleRoutes');
const { getDepartments, newDepartment } = require('./routes/apiRoutes/departmentRoutes');

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
    startQuestions();
});

const startQuestions = () => {
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
            'Update an employee Role'
        ]
      }
    ]).then(options => {
        switch (options.choice) {
            case 'View All Departments':
                getDepartments();
                break;

            case 'View All Roles':
                getRoles();
                break;
            
            case 'View All Employees':
                getEmployees();
                break;

            case 'Add a Department':
                addDepartment();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee':
                updateEmployee();
                break;

        }
    });
  };

  const addDepartment = () => {
      return inquirer.prompt([
          {
              type: 'input',
              name: 'newDepartment',
              message: 'What is the name of your new department?',
              validate: newDepartmentInput => {
                  if (newDepartmentInput) {
                      return true;
                  } else {
                      console.log('Please provide a name for your new department.');
                      return false;
                  }
              }
          }
      ]).then(newDepartmentInput => {
          newDepartment(newDepartmentInput);
          return startQuestions();
      })
  }