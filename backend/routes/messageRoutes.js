const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, markAsRead, getConversations } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect); // Toutes les routes de messages nécessitent d'être connecté

router.get('/conversations', getConversations);

router.post('/', sendMessage);
router.get('/conversation/:userId', getConversation);
router.put('/:id/lu', markAsRead);

module.exports = router;
