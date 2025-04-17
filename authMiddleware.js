const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: Access Denied' });
            }

            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = authMiddleware;
