const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

router.post('/', claimController.createClaim);
router.get('/', claimController.getAllClaims);
router.get('/:id', claimController.getClaimById);
router.put('/:id', claimController.updateClaimById);
router.delete('/:id', claimController.deleteClaimById);

module.exports = router;