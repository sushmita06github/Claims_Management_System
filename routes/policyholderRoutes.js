const express = require('express');
const router = express.Router();
const policyholderController = require('../controllers/policyholderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', policyholderController.createPolicyholder);
router.post('/login', policyholderController.login);
router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), policyholderController.getAllPolicyholders);
router.get('/:id', authMiddleware.authenticate, policyholderController.getPolicyholderById);
router.put('/:id', authMiddleware.authenticate, policyholderController.updatePolicyholderById);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), policyholderController.deletePolicyholderById);

module.exports = router;