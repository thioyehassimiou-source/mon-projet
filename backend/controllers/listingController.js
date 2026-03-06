const { query } = require('../config/database');

// @desc    Obtenir tous les logements avec filtres
// @route   GET /api/logements
exports.getListings = async (req, res) => {
    const { price_max, localisation, type } = req.query;
    let sql = 'SELECT * FROM logements WHERE 1=1';
    const params = [];

    if (price_max) {
        params.push(price_max);
        sql += ` AND price <= $${params.length}`;
    }
    if (localisation) {
        params.push(`%${localisation}%`);
        sql += ` AND localisation ILIKE $${params.length}`;
    }
    if (type) {
        params.push(type);
        sql += ` AND exigences->>'type' = $${params.length}`;
    }

    try {
        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Créer un logement
// @route   POST /api/logements
exports.createListing = async (req, res) => {
    const { titre, description, price, localisation, exigences, owner_id } = req.body;

    try {
        const result = await query(
            'INSERT INTO logements (titre, description, price, localisation, exigences, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titre, description, price, localisation, exigences || {}, owner_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtenir un logement par ID
// @route   GET /api/logements/:id
exports.getListingById = async (req, res) => {
    try {
        const result = await query('SELECT * FROM logements WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Logement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Modifier un logement
// @route   PUT /api/logements/:id
exports.updateListing = async (req, res) => {
    const { titre, description, price, localisation, exigences, statut } = req.body;
    try {
        const result = await query(
            'UPDATE logements SET titre=$1, description=$2, price=$3, localisation=$4, exigences=$5, statut=$6 WHERE id=$7 RETURNING *',
            [titre, description, price, localisation, exigences, statut, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Supprimer un logement
// @route   DELETE /api/logements/:id
exports.deleteListing = async (req, res) => {
    try {
        await query('DELETE FROM logements WHERE id = $1', [req.params.id]);
        res.json({ message: 'Logement supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Ajouter/Retirer un logement des favoris
// @route   POST /api/logements/:id/favori
exports.toggleFavorite = async (req, res) => {
    const userId = req.user.id;
    const listingId = req.params.id;

    try {
        // Vérifier si déjà en favori
        const exist = await query('SELECT * FROM favoris WHERE id_utilisateur = $1 AND id_logement = $2', [userId, listingId]);

        if (exist.rows.length > 0) {
            // Retirer
            await query('DELETE FROM favoris WHERE id_utilisateur = $1 AND id_logement = $2', [userId, listingId]);
            res.json({ success: true, is_favorited: false, message: 'Retiré des favoris' });
        } else {
            // Ajouter
            await query('INSERT INTO favoris (id_utilisateur, id_logement) VALUES ($1, $2)', [userId, listingId]);
            res.json({ success: true, is_favorited: true, message: 'Ajouté aux favoris' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

