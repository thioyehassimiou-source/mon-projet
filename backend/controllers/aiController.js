const { query } = require('../config/database');
const aiService = require('../services/ai.service');

// 1. Gestion des Conversations IA

exports.createConversation = async (req, res) => {
    try {
        const result = await query(
            'INSERT INTO conversations_ia (id_utilisateur) VALUES ($1) RETURNING *',
            [req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConversations = async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM conversations_ia WHERE id_utilisateur = $1 ORDER BY date_creation DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Envoi d'un message avec moteur RAG
exports.handleAIChat = async (req, res) => {
    const { contenu, id_conversation } = req.body;
    const userId = req.user.id;

    try {
        // 1. Sauvegarder le message de l'utilisateur
        await query(
            'INSERT INTO messages_ia (role, contenu, id_conversation) VALUES ($1, $2, $3)',
            ['user', contenu, id_conversation]
        );

        // 2. Recherche RAG : Extraire des mots clés simples du contenu pour le SQL
        // Ici on fait une recherche simplifiée sur la localisation ou le titre
        const keywords = contenu.split(' ').filter(w => w.length > 3);
        let propertyContext = [];

        if (keywords.length > 0) {
            const searchQuery = `
                SELECT * FROM logements 
                WHERE titre ILIKE $1 OR localisation ILIKE $1 OR description ILIKE $1
                LIMIT 5
            `;
            const searchResult = await query(searchQuery, [`%${keywords[0]}%`]);
            propertyContext = searchResult.rows;
        }

        // 3. Appeler le service IA avec le contexte
        const aiResponse = await aiService.generateResponse(contenu, propertyContext);

        // 4. Sauvegarder et retourner la réponse de l'IA
        const savedAIMsg = await query(
            'INSERT INTO messages_ia (role, contenu, id_conversation) VALUES ($1, $2, $3) RETURNING *',
            ['assistant', aiResponse, id_conversation]
        );

        res.status(201).json(savedAIMsg.rows[0]);
    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ message: "Erreur lors du chat IA" });
    }
};

// 3. Gestion des Recommandations et préférences

exports.saveRecommendation = async (req, res) => {
    const { score, id_logement } = req.body;
    try {
        const result = await query(
            'INSERT INTO recommandations (score, id_utilisateur, id_logement) VALUES ($1, $2, $3) RETURNING *',
            [score, req.user.id, id_logement]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePreferences = async (req, res) => {
    const { budget_max, localisation_preferee, type_logement, autres_criteres } = req.body;
    try {
        // On utilise UPSERT (ON CONFLICT) pour le profil unique par utilisateur
        const result = await query(
            `INSERT INTO profil_preferences (budget_max, localisation_preferee, type_logement, autres_criteres, id_utilisateur) 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id_utilisateur) DO UPDATE SET 
       budget_max = EXCLUDED.budget_max,
       localisation_preferee = EXCLUDED.localisation_preferee,
       type_logement = EXCLUDED.type_logement,
       autres_criteres = EXCLUDED.autres_criteres
       RETURNING *`,
            [budget_max, localisation_preferee, type_logement, autres_criteres || {}, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMessagesByConversation = async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM messages_ia WHERE id_conversation = $1 ORDER BY date_message ASC',
            [req.params.id_conversation]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
