const express = require('express');
const router = express.Router();
const { getListings, createListing, getListingById, updateListing, deleteListing, toggleFavorite } = require('../controllers/listingController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/:id/favori', protect, toggleFavorite);
router.post('/', protect, authorize('proprietaire', 'admin'), createListing);
router.put('/:id', protect, authorize('proprietaire', 'admin'), updateListing);
router.delete('/:id', protect, authorize('proprietaire', 'admin'), deleteListing);


module.exports = router;
