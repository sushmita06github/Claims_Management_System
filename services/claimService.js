const Claim = require('../models/claim');

module.exports = {
    createClaim: async (data) => {
        return await Claim.create(data);
    },

    getClaimById: async (id) => {
        return await Claim.findById(id);
    },

    getAllClaims: async () => {
        return await Claim.find();
    },

    updateClaimById: async (id, data) => {
        return await Claim.findByIdAndUpdate(id, data, { new: true });
    },

    deleteClaimById: async (id) => {
        return await Claim.findByIdAndDelete(id);
    }
};