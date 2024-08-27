const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// POST /link/generate - Generate a one-time link
router.post('/generate', linkController.generateLink);

// GET /link/verify - Verify the one-time link
router.get('/verify', linkController.verifyLink);

module.exports = router;
