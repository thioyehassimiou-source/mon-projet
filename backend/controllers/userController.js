const { query } = require('../config/database');

// @desc    Obtenir tous les utilisateurs (Admin uniquement recommandé)
// @route   GET /api/utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const result = await query('SELECT id, name, email, role, created_at FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtenir un utilisateur par ID
// @route   GET /api/utilisateurs/:id
exports.getUserById = async (req, res) => {
    try {
        const result = await query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer les préférences du profil
// @route   GET /api/utilisateurs/:id/preferences
exports.getPreferences = async (req, res) => {
    try {
        const result = await query('SELECT * FROM profil_preferences WHERE id_utilisateur = $1', [req.params.id]);
        res.json(result.rows[0] || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer mes propres annonces
// @route   GET /api/utilisateurs/me/logements
exports.getMyListings = async (req, res) => {
    try {
        const result = await query('SELECT * FROM logements WHERE owner_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer mes favoris
// @route   GET /api/utilisateurs/me/favoris
exports.getMyFavorites = async (req, res) => {
    try {
        const result = await query(
            `SELECT l.* FROM logements l 
             JOIN favoris f ON l.id = f.id_logement 
             WHERE f.id_utilisateur = $1 
             ORDER BY f.date_ajout DESC`,
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

