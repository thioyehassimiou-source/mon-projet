const { query } = require('../config/database');

// @desc    Obtenir les logements en attente de validation
// @route   GET /api/admin/pending-listings
exports.getPendingListings = async (req, res) => {
    try {
        const result = await query(
            `SELECT l.*, u.name as owner_name, u.email as owner_email 
             FROM logements l 
             JOIN users u ON l.owner_id = u.id 
             WHERE l.statut = 'en_attente' 
             ORDER BY l.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Valider ou rejeter un logement
// @route   PUT /api/admin/listings/:id/status
exports.updateListingStatus = async (req, res) => {
    const { status } = req.body; // 'disponible' ou 'rejeté'
    if (!['disponible', 'rejeté', 'en_attente'].includes(status)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
        const result = await query(
            'UPDATE logements SET statut = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Logement non trouvé' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtenir les utilisateurs en attente de vérification KYC
// @route   GET /api/admin/pending-users
exports.getPendingUsers = async (req, res) => {
    try {
        const result = await query(
            "SELECT id, name, email, role, id_number, id_document, is_verified, created_at FROM users WHERE id_document IS NOT NULL AND is_verified = FALSE ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Valider le KYC d'un utilisateur
// @route   PUT /api/admin/users/:id/verify
exports.verifyUser = async (req, res) => {
    const { is_verified } = req.body;
    try {
        const result = await query(
            'UPDATE users SET is_verified = $1 WHERE id = $2 RETURNING id, name, is_verified',
            [is_verified, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
