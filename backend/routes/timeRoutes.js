const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

// GET /time - Get current server time
router.get('/', timeController.getTime);

module.exports = router;
