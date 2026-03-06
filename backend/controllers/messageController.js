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
