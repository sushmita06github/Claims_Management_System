const jwt = require('jsonwebtoken');
const Policyholder = require('../models/policyholder');
const bcrypt = require('bcryptjs');

module.exports = {
    generateToken: (userId, role) => {

        const expiresIn = role === 'admin' ? '30d' : '15d';
        return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn });
        //return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    },
    verifyToken: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
};