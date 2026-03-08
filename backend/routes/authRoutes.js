const express = require('express');
const router = express.Router();
const { register, login, getProfile, uploadKYCDocument } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { uploadKYC } = require('../middleware/upload');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.post('/upload-kyc', protect, uploadKYC.single('document'), uploadKYCDocument);

module.exports = router;
