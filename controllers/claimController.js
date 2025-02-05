const claimService = require('../services/claimService');
const claimValidation = require('../validation/claimValidation');

module.exports = {
    createClaim: (req, res) => {
        try {
            claimValidation.validateClaimData(req.body);
            const claim = claimService.createClaim(req.body);
            res.status(201).json(claim);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getClaimById: (req, res) => {
        const claim = claimService.getClaimById(req.params.id);
        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }
        res.status(200).json(claim);
    },

    getAllClaims: (req, res) => {
        const claims = claimService.getAllClaims();
        res.status(200).json(claims);
    },

    updateClaimById: (req, res) => {
        try {
            const updatedClaim = claimService.updateClaimById(req.params.id, req.body);
            if (!updatedClaim) {
                return res.status(404).json({ message: "Claim not found" });
            }
            res.status(200).json(updatedClaim);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteClaimById: (req, res) => {
        const result = claimService.deleteClaimById(req.params.id);
        res.status(200).json(result);
    }
};