const policyService = require('../services/policyService');
const policyValidation = require('../validation/policyValidation');

module.exports = {
    createPolicy: (req, res) => {
        try {
            policyValidation.validatePolicyData(req.body);
            const policy = policyService.createPolicy(req.body);
            res.status(201).json(policy);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getPolicyById: (req, res) => {
        const policy = policyService.getPolicyById(req.params.id);
        if (!policy) {
            return res.status(404).json({ message: "Policy not found" });
        }
        res.status(200).json(policy);
    },

    getAllPolicies: (req, res) => {
        const policies = policyService.getAllPolicies();
        res.status(200).json(policies);
    },

    updatePolicyById: (req, res) => {
        try {
            policyValidation.validatePolicyData(req.body); // Validate update data as well
            const updatedPolicy = policyService.updatePolicyById(req.params.id, req.body);
            if (!updatedPolicy) {
                return res.status(404).json({ message: "Policy not found" });
            }
            res.status(200).json(updatedPolicy);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deletePolicyById: (req, res) => {
        const result = policyService.deletePolicyById(req.params.id);
        res.status(200).json(result);
    }
};