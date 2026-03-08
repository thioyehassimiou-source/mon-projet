const express = require('express');
const router = express.Router();
const { initiatePayment, handleWebhook, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Webhook (Pas de protect ici car appelé par CinetPay)
router.post('/webhook', handleWebhook);

router.use(protect);
router.post('/initiate', initiatePayment);
router.get('/historique', getPaymentHistory);

module.exports = router;
