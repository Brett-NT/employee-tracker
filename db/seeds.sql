INSERT INTO departments (name)
VALUES 
    ('Research and Development'), 
    ('Marketing'), 
    ('Web Development'), 
    ('Sales'), 
    ('Finance');

INSERT INTO roles (name, salary, department_id)
VALUES 
    ('QA Tester', 40000, 1),
    ('Junior Developer', 60000, 3),
    ('Senior Developer', 120000, 3),
    ('Sales Rep', 45000, 4),
    ('Accountant', 90000, 5),
    ('Marketing Rep', 70000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Brett', 'Howard', 2, null),
    ('Jacob', 'Mullen', 5, 1),
    ('Phoebe', 'Stokes', 6, 1),
    ('David', 'Gebert', 3, 1);