const Policyholder = require('../models/policyholder');
const { v4: uuidv4 } = require('uuid');

let policyholders = [];

module.exports = {
    createPolicyholder: (data) => {
        const newPolicyholder = new Policyholder(
            uuidv4(),
            data.name,
            data.email,
            data.phone
        );
        policyholders.push(newPolicyholder);
        return newPolicyholder;
    },

    getPolicyholderById: (id) => policyholders.find((policyholder) => policyholder.id === id),

    getAllPolicyholders: () => policyholders,

    updatePolicyholderById: (id, data) => {
        const policyholderIndex = policyholders.findIndex(policyholder => policyholder.id === id);
        if (policyholderIndex !== -1) {
            policyholders[policyholderIndex] = { ...policyholders[policyholderIndex], ...data };
            return policyholders[policyholderIndex];
        }
        return null;
    },

    deletePolicyholderById: (id) => {
        policyholders = policyholders.filter(policyholder => policyholder.id !== id);
        return { message: "Policyholder deleted successfully" };
    }
};