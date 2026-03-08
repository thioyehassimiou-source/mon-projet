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

// Envoi d'un message avec moteur RAG Dynamique (Phase 5)
exports.handleAIChat = async (req, res) => {
    const { contenu, id_conversation } = req.body;
    const userId = req.user.id;

    try {
        // 0. Vérifier la conversation (Sécurité)
        const convCheck = await query('SELECT * FROM conversations_ia WHERE id = $1 AND id_utilisateur = $2', [id_conversation, userId]);
        if (convCheck.rows.length === 0) {
            return res.status(404).json({ message: "Conversation non trouvée" });
        }

        // 1. Sauvegarder le message utilisateur
        await query(
            'INSERT INTO messages_ia (role, contenu, id_conversation) VALUES ($1, $2, $3)',
            ['user', contenu, id_conversation]
        );

        // 2. IA : Extraire les critères structurés
        const criteria = await aiService.extractSearchCriteria(contenu);
        console.log("Criteria extracted:", criteria);

        // 3. BDD : Recherche dynamique basée sur l'IA
        let propertyContext = [];
        let sql = `SELECT * FROM logements WHERE statut = 'disponible'`;
        const params = [];

        if (criteria.prix_max) {
            params.push(criteria.prix_max);
            sql += ` AND price <= $${params.length}`;
        }
        if (criteria.quartier) {
            params.push(`%${criteria.quartier}%`);
            sql += ` AND localisation ILIKE $${params.length}`;
        }
        if (criteria.type) {
            params.push(criteria.type);
            sql += ` AND exigences->>'type' = $${params.length}`;
        }

        sql += ` LIMIT 3`; // On limite à 3 pour le chat

        const searchResult = await query(sql, params);
        propertyContext = searchResult.rows;

        // 4. IA : Générer la réponse finale avec le contexte réel
        const aiResponse = await aiService.generateResponse(contenu, propertyContext);

        // 5. Sauvegarder et retourner la réponse
        const savedAIMsg = await query(
            'INSERT INTO messages_ia (role, contenu, id_conversation) VALUES ($1, $2, $3) RETURNING *',
            ['assistant', aiResponse, id_conversation]
        );

        // On ajoute les résultats structurés pour que le frontend puisse les afficher en cartes
        const responseData = {
            ...savedAIMsg.rows[0],
            results: propertyContext
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error("AI Controller Error:", error);
        res.status(500).json({ message: "Erreur lors de l'analyse IA" });
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
