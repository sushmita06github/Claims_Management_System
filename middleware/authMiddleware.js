const authService = require('../services/authService');

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

        try {
            const decoded = authService.verifyToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            console.error("Token verification error:", err.message);
            res.status(400).json({ message: 'Invalid token.' });
        }
    },

    authorize: (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
            }
            next();
        };
    }
};