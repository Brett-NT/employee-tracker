const express = require('express');
const db = require('./db/connection.js');
const inputCheck = require('./utils/inputCheck');
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

// server listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});