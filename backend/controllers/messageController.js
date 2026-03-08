const { query } = require('../config/database');

// @desc    Envoyer un message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
    const { contenu, id_destinataire, id_logement } = req.body;
    const id_expediteur = req.user.id; // Récupéré du token via protect

    try {
        const result = await query(
            'INSERT INTO messages (contenu, id_expediteur, id_destinataire, id_logement) VALUES ($1, $2, $3, $4) RETURNING *',
            [contenu, id_expediteur, id_destinataire, id_logement]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer les messages d'une conversation
// @route   GET /api/messages/conversation/:userId
exports.getConversation = async (req, res) => {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;

    try {
        const result = await query(
            `SELECT * FROM messages 
       WHERE (id_expediteur = $1 AND id_destinataire = $2) 
       OR (id_expediteur = $2 AND id_destinataire = $1)
       ORDER BY date_envoi ASC`,
            [currentUserId, otherUserId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Marquer un message comme lu
// @route   PUT /api/messages/:id/lu
exports.markAsRead = async (req, res) => {
    try {
        await query('UPDATE messages SET lu = TRUE WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Récupérer toutes les conversations de l'utilisateur connecté
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res) => {
    const userId = req.user.id;
    try {
        // Cette requête récupère la liste des utilisateurs avec qui l'utilisateur courant a échangé
        // ainsi que le dernier message échangé.
        const result = await query(
            `WITH LastMessages AS (
                SELECT 
                    CASE WHEN id_expediteur = $1 THEN id_destinataire ELSE id_expediteur END as other_user_id,
                    contenu,
                    date_envoi,
                    id_logement,
                    ROW_NUMBER() OVER(PARTITION BY CASE WHEN id_expediteur = $1 THEN id_destinataire ELSE id_expediteur END ORDER BY date_envoi DESC) as rn
                FROM messages
                WHERE id_expediteur = $1 OR id_destinataire = $1
            )
            SELECT 
                u.id, 
                u.name, 
                u.photo,
                lm.contenu as last_message, 
                lm.date_envoi as last_message_date,
                lm.id_logement
            FROM users u
            JOIN LastMessages lm ON u.id = lm.other_user_id
            WHERE lm.rn = 1
            ORDER BY lm.date_envoi DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
