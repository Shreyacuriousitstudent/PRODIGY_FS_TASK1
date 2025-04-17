const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
// Register route (POST)
router.post('/register', async (req, res) => {
    // Registration logic here
    res.send('Register route (POST)');
});

// Login route (POST)
router.post('/login', async (req, res) => {
    // Login logic here
    res.send('Login route (POST)');
});

// Temporary GET routes for testing
router.get('/register', async (req, res) => {
    res.send('Register route (GET)');
});

router.get('/login', async (req, res) => {
    res.send('Login route (GET)');
});
router.post('/register', register);
router.post('/login', login);
module.exports = router;
