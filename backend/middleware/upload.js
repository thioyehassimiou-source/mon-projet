const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configuration du stockage pour les documents KYC
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/kyc/');
    },
    filename: (req, file, cb) => {
        // Renommage sécurisé : random string + extension
        const randomName = crypto.randomBytes(16).toString('hex');
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${randomName}${extension}`);
    }
});

// Filtre de fichiers (Images et PDF uniquement)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non supporté. Seuls les formats JPG, PNG et PDF sont autorisés.'), false);
    }
};

const uploadKYC = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite à 5Mo
    }
});

module.exports = { uploadKYC };
