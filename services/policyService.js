const Policy = require('../models/policy');
const { v4: uuidv4 } = require('uuid');

let policies = [];

module.exports = {
    createPolicy: (data) => {
        const newPolicy = new Policy(
            uuidv4(), // Generate UUID here
            data.policyholderId, 
            data.policyNumber, 
            data.coverageAmount, 
            data.startDate, 
            data.endDate
        );
        policies.push(newPolicy);
        return newPolicy;
    },

    getPolicyById: (id) => policies.find((policy) => policy.id === id),

    getAllPolicies: () => policies,

    updatePolicyById: (id, data) => {
        const policyIndex = policies.findIndex(policy => policy.id === id);
        if (policyIndex !== -1) {
            policies[policyIndex] = { ...policies[policyIndex], ...data };
            return policies[policyIndex];
        }
        return null;
    },

    deletePolicyById: (id) => {
        policies = policies.filter(policy => policy.id !== id);
        return { message: "Policy deleted successfully" };
    }
};
