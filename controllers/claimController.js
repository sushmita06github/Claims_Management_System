const claimService = require('../services/claimService');

module.exports = {
    createClaim: async (req, res) => {
        try {
            const claim = await claimService.createClaim(req.body);
            res.status(201).json(claim);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getClaimById: async (req, res) => {
        try {
            const claim = await claimService.getClaimById(req.params.id);
            if (!claim) return res.status(404).json({ message: "Claim not found" });
            res.status(200).json(claim);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAllClaims: async (req, res) => {
        try {
            res.status(200).json(await claimService.getAllClaims());
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateClaimById: async (req, res) => {
        try {
            const updatedClaim = await claimService.updateClaimById(req.params.id, req.body);
            if (!updatedClaim) return res.status(404).json({ message: "Claim not found" });
            res.status(200).json(updatedClaim);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteClaimById: async (req, res) => {
        try {
            res.status(200).json(await claimService.deleteClaimById(req.params.id));
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};