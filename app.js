const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Authentication Middleware
app.use((req, res, next) => {
    // Implement your authentication logic here
    // Check for valid authentication token, user session, etc.
    // If authenticated, proceed with the request, else send unauthorized response
    next();
});

// Sample Database
const users = [];

// API Endpoints

// GET user details
app.get('/details/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const user = users.find(user => user.user_id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// PUT update user details
app.put('/update/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const updatedDetails = req.body;
    const userIndex = users.findIndex(user => user.user_id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedDetails };
        res.json({ message: 'User details updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// GET user image
app.get('/image/:user_id', (req, res) => {
    const userId = req.params.user_id;
    // Logic to retrieve user image from database
    res.json({ user_image: 'path/to/user/image.jpg' });
});

// POST insert new user
app.post('/insert', (req, res) => {
    const newUser = req.body;
    // Logic to insert new user into the database
    users.push(newUser);
    res.json({ message: 'User created successfully' });
});

// DELETE user
app.delete('/delete/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const userIndex = users.findIndex(user => user.user_id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
