const Policyholder = require('../models/policyholder');

module.exports = {
    createPolicyholder: async (data) => {
        return await Policyholder.create(data);
    },

    getPolicyholderById: async (id) => {
        return await Policyholder.findById(id);
    },

    getAllPolicyholders: async () => {
        return await Policyholder.find();
    },

    updatePolicyholderById: async (id, data) => {
        return await Policyholder.findByIdAndUpdate(id, data, { new: true });
    },

    deletePolicyholderById: async (id) => {
        return await Policyholder.findByIdAndDelete(id);
    }
};