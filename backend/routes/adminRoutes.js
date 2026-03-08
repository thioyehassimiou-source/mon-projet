const express = require('express');
const router = express.Router();
const {
    getPendingListings,
    updateListingStatus,
    getPendingUsers,
    verifyUser
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Toutes les routes ici nécessitent d'être admin
router.use(protect);
router.use(authorize('admin'));

router.get('/pending-listings', getPendingListings);
router.put('/listings/:id/status', updateListingStatus);
router.get('/pending-users', getPendingUsers);
router.put('/users/:id/verify', verifyUser);

module.exports = router;
