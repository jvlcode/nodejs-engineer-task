const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST /admin/kickout - Invalidate all tokens for a user
router.post('/kickout', adminController.kickoutUser);

module.exports = router;
