const express = require('express');
const router = express.Router();
const {
    createConversation, getConversations, handleAIChat,
    getMessagesByConversation, saveRecommendation, updatePreferences
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/conversations', createConversation);
router.get('/conversations', getConversations);
router.post('/chat', handleAIChat);
router.get('/messages/:id_conversation', getMessagesByConversation);
router.post('/recommandations', saveRecommendation);
router.put('/preferences', updatePreferences);

module.exports = router;
