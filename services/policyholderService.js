const Policyholder = require('../models/policyholder');
const bcrypt = require('bcryptjs');

module.exports = {
    createPolicyholder: async (data) => {
        // data.password = await bcrypt.hash(data.password, 10);
        return await Policyholder.create(data);
    },

    getPolicyholderById: async (id) => {
        return await Policyholder.findById(id);
    },

    getAllPolicyholders: async () => {
        return await Policyholder.find();
    },

    updatePolicyholderById: async (id, data) => {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return await Policyholder.findByIdAndUpdate(id, data, { new: true });
    },

    deletePolicyholderById: async (id) => {
        return await Policyholder.findByIdAndDelete(id);
    },
    
    // Add a method to find a policyholder by email (used in authService)
    findPolicyholderByEmail: async (email) => {
        return await Policyholder.findOne({ email });
    }
};