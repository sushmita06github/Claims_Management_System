const Claim = require('../models/claim');
const { v4: uuidv4 } = require('uuid');

let claims = [];

module.exports = {
    createClaim: (data) => {
        const newClaim = new Claim(
            uuidv4(), // Generate unique ID
            data.policyId,
            data.amount,
            data.status || "Pending", // Default status if not provided
            data.dateFiled
        );
        claims.push(newClaim);
        return newClaim;
    },

    getClaimById: (id) => claims.find(claim => claim.id === id),

    getAllClaims: () => claims,

    updateClaimById: (id, data) => {
        const claimIndex = claims.findIndex(claim => claim.id === id);
        if (claimIndex !== -1) {
            claims[claimIndex] = { ...claims[claimIndex], ...data };
            return claims[claimIndex];
        }
        return null;
    },

    deleteClaimById: (id) => {
        claims = claims.filter(claim => claim.id !== id);
        return { message: "Claim deleted successfully" };
    }
};