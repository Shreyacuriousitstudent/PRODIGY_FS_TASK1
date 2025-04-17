
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Admin-only route
router.get('/dashboard', authMiddleware(['admin']), (req, res) => {
    res.json({
        message: 'Welcome to the Admin Dashboard!',
        user: req.user
    });
});

module.exports = router;

