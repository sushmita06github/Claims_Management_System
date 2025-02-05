const policyholderService = require('../services/policyholderService');
const policyholderValidation = require('../validation/policyholderValidation');

module.exports = {
    createPolicyholder: (req, res) => {
        try {
            policyholderValidation.validatePolicyholderData(req.body);
            const policyholder = policyholderService.createPolicyholder(req.body);
            res.status(201).json(policyholder);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getPolicyholderById: (req, res) => {
        const policyholder = policyholderService.getPolicyholderById(req.params.id);
        if (!policyholder) {
            return res.status(404).json({ message: "Policyholder not found" });
        }
        res.status(200).json(policyholder);
    },

    getAllPolicyholders: (req, res) => {
        const policyholders = policyholderService.getAllPolicyholders();
        res.status(200).json(policyholders);
    },

    updatePolicyholderById: (req, res) => {
        try {
            policyholderValidation.validatePolicyholderData(req.body);
            const updatedPolicyholder = policyholderService.updatePolicyholderById(req.params.id, req.body);
            if (!updatedPolicyholder) {
                return res.status(404).json({ message: "Policyholder not found" });
            }
            res.status(200).json(updatedPolicyholder);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deletePolicyholderById: (req, res) => {
        const result = policyholderService.deletePolicyholderById(req.params.id);
        res.status(200).json(result);
    }
};