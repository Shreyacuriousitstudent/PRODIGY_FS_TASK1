const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('./backend/config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 5001;  // Use a single port

// Connect to the database
const connectDB = require('./backend/config/db');
connectDB();

// 🔹 **User Registration**
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// 🔹 **User Login**
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = results[0];
        const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');

        if (hashedPassword !== user.password) return res.status(401).json({ message: 'Incorrect password' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    });
});

// 🔹 **Start Server**
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));