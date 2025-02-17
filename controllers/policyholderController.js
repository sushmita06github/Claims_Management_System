const policyholderService = require('../services/policyholderService');
const authService = require('../services/authService');
const policyholderValidation = require('../validation/policyholderValidation');
const Policyholder = require('../models/policyholder'); // Import the model

const bcrypt = require('bcryptjs');

module.exports = {
    createPolicyholder: async (req, res) => {
        try {
            // Validate input data
            policyholderValidation.validatePolicyholderData(req.body);
            
            const { name, email, phone, password, role, adminSecret } = req.body;
            
            // Set a default role of 'user'
            let assignedRole = 'user';

            // If the client requests an 'admin' role, check for the adminSecret
            if (role && role === 'admin') {
                if (adminSecret && adminSecret === process.env.ADMIN_SECRET) {
                    assignedRole = 'admin';
                } else {
                    return res.status(403).json({ message: 'Invalid admin secret code' });
                }
            }
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new policyholder with the hashed password and determined role
            const policyholder = await policyholderService.createPolicyholder({ 
                name, 
                email, 
                phone, 
                password: hashedPassword, 
                role: assignedRole
            });

            // Optionally remove the password from the returned object
            policyholder.password = undefined;

            res.status(201).json({ 
                message: "Policyholder registered successfully", 
                policyholder 
            });
        } catch (err) {
            console.error("Error:", err.message);
            res.status(400).json({ message: err.message });
        }
    },
    
    login: async (req, res) => {
        console.log("Login start");
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            // Find policyholder in the database by email
            const policyholder = await Policyholder.findOne({ email });
            if (!policyholder) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            console.log("Login start1");

            // Compare the entered password with the stored hashed password
            const isMatch = await bcrypt.compare(password, policyholder.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log("Login start2");

            // Generate JWT token
            const token = authService.generateToken(policyholder._id, policyholder.role);

            res.status(200).json({
                token,
                user: {
                    id: policyholder._id,
                    name: policyholder.name,
                    email: policyholder.email,
                    role: policyholder.role
                }
            });
        } catch (err) {
            console.error("Login error:", err.message);
            res.status(400).json({ message: err.message });
        }
    },

    getPolicyholderById: async (req, res) => {
        try {
            const policyholder = await policyholderService.getPolicyholderById(req.params.id);
            if (!policyholder) return res.status(404).json({ message: "Policyholder not found" });
            res.status(200).json(policyholder);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAllPolicyholders: async (req, res) => {
        try {
            const policyholders = await policyholderService.getAllPolicyholders();
            res.status(200).json(policyholders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updatePolicyholderById: async (req, res) => {
        try {
            policyholderValidation.validatePolicyholderData(req.body);
            const updatedPolicyholder = await policyholderService.updatePolicyholderById(req.params.id, req.body);
            if (!updatedPolicyholder) return res.status(404).json({ message: "Policyholder not found" });
            res.status(200).json(updatedPolicyholder);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deletePolicyholderById: async (req, res) => {
        try {
            const deletedPolicyholder = await policyholderService.deletePolicyholderById(req.params.id);
            if (!deletedPolicyholder) return res.status(404).json({ message: "Policyholder not found" });
            //res.status(200).json(deletedPolicyholder);
            res.status(200).json({ message: "Policyholder deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
