const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

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

// @desc    Mettre à jour le profil de l'utilisateur connecté
// @route   PUT /api/utilisateurs/me
exports.updateProfile = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const result = await query(
            `UPDATE users
             SET name = COALESCE($1, name),
                 email = COALESCE($2, email),
                 phone = COALESCE($3, phone)
             WHERE id = $4
             RETURNING id, name, email, role, phone, photo, created_at`,
            [name, email, phone, req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Changer le mot de passe
// @route   PUT /api/utilisateurs/me/password
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const result = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe actuel incorrect' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        await query('UPDATE users SET password = $1 WHERE id = $2', [hashed, req.user.id]);
        res.json({ success: true, message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
