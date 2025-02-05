const express = require('express');
const router = express.Router();
const policyholderController = require('../controllers/policyholderController');

router.post('/', policyholderController.createPolicyholder);
router.get('/', policyholderController.getAllPolicyholders);
router.get('/:id', policyholderController.getPolicyholderById);
router.put('/:id', policyholderController.updatePolicyholderById);
router.delete('/:id', policyholderController.deletePolicyholderById);

module.exports = router;