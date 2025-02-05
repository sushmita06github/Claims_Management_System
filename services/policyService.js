const Policy = require('../models/policy');

module.exports = {
    createPolicy: async (data) => {
        return await Policy.create(data);
    },

    getPolicyById: async (id) => {
        return await Policy.findById(id);
    },

    getAllPolicies: async () => {
        return await Policy.find();
    },

    updatePolicyById: async (id, data) => {
        return await Policy.findByIdAndUpdate(id, data, { new: true });
    },

    deletePolicyById: async (id) => {
        return await Policy.findByIdAndDelete(id);
    }
};
