const express = require('express');
const router = express.Router();
const { handleChat } = require('../Controllers/chatController');

// POST /api/chat
router.post('/chat', handleChat);

module.exports = router;
