const express = require('express');
const router = express.Router();
const { getUsers, getUserById, getPreferences, getMyListings, getMyFavorites, updateProfile, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/', getUsers);
router.get('/me/logements', protect, getMyListings);
router.get('/me/favoris', protect, getMyFavorites);
router.put('/me', protect, updateProfile);
router.put('/me/password', protect, updatePassword);
router.get('/:id', getUserById);
router.get('/:id/preferences', getPreferences);


module.exports = router;
