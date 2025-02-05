const policyholderService = require('../services/policyholderService');

module.exports = {
    createPolicyholder: async (req, res) => {
        try {
            // Data Validation
            const { name, address } = req.body;
            if (!name || !address) {
                return res.status(400).json({ message: "Missing required fields: name and address" });
            }

            const policyholder = await policyholderService.createPolicyholder(req.body);
            res.status(201).json(policyholder);
        } catch (err) {
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
            res.status(200).json(deletedPolicyholder);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};