const policyService = require('../services/policyService');
const policyValidation = require('../validation/policyValidation');

module.exports = {
    createPolicy: async (req, res) => {
        try {
            policyValidation.validatePolicyData(req.body);
            const { policyNumber, policyholder, coverageAmount } = req.body;
            if (!policyNumber || !policyholder || !coverageAmount) {
                return res.status(400).json({ message: "Missing required fields: policyNumber, policyholder, and coverageAmount" });
            }

            const policy = await policyService.createPolicy(req.body);
            res.status(201).json(policy);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getPolicyById: async (req, res) => {
        try {
            const policy = await policyService.getPolicyById(req.params.id);
            if (!policy) return res.status(404).json({ message: "Policy not found" });
            res.status(200).json(policy);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAllPolicies: async (req, res) => {
        try {
            const policies = await policyService.getAllPolicies();
            res.status(200).json(policies);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updatePolicyById: async (req, res) => {
        try {
            policyValidation.validatePolicyData(req.body);
            const updatedPolicy = await policyService.updatePolicyById(req.params.id, req.body);
            if (!updatedPolicy) return res.status(404).json({ message: "Policy not found" });
            res.status(200).json(updatedPolicy);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deletePolicyById: async (req, res) => {
        try {
            const deletedPolicy = await policyService.deletePolicyById(req.params.id);
            if (!deletedPolicy) return res.status(404).json({ message: "Policy not found" });
            res.status(200).json(deletedPolicy);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};