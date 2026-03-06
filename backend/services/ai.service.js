const Groq = require('groq-sdk');
require('dotenv').config();

class AIService {
    constructor() {
        const apiKey = process.env.GROQ_API_KEY;
        if (apiKey) {
            this.groq = new Groq({ apiKey });
        } else {
            console.warn("⚠️ GROQ_API_KEY manquante. L'IA fonctionnera en mode simulation.");
        }
    }

    async generateResponse(userQuery, propertyContext = []) {
        if (!this.groq) {
            return `[SIMULATION GROQ] Vous cherchez : "${userQuery}". Voici des suggestions basées sur nos ${propertyContext.length} logements trouvés...`;
        }

        // Construction du contexte structuré
        const contextString = propertyContext.map(p =>
            `- TITRE: ${p.titre} | PRIX: ${p.prix} GNF | LOCALISATION: ${p.localisation} | DESCRIPTION: ${p.description}`
        ).join('\n');

        const systemPrompt = `
            Tu es l'assistant intelligent "GuinéeLogement Expert".
            Ton rôle est d'aider les utilisateurs à trouver des logements en Guinée (Conakry).
            
            RÈGLES STRICTES :
            1. Ne parle QUE des logements fournis dans le CONTEXTE ci-dessous.
            2. Si aucun logement n'est fourni, explique que tu n'as pas de biens correspondants mais donne des conseils généraux sur le quartier mentionné.
            3. INTERDICTION d'inventer des logements ou des prix.
            4. Réponds en FRANÇAIS, de manière professionnelle et concise.
            5. Propose maximum 2-3 logements parmi ceux fournis.
            
            CONTEXTE DES LOGEMENTS DISPONIBLES :
            ${contextString || "AUCUN LOGEMENT TROUVÉ"}
        `;

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userQuery }
                ],
                model: "mixtral-8x7b-32768",
                temperature: 0.2,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            });

            return completion.choices[0]?.message?.content || "Désolé, je ne peux pas générer de réponse pour le moment.";
        } catch (error) {
            console.error("Erreur GROQ API:", error.message);
            throw new Error("Erreur lors de la communication avec le moteur IA.");
        }
    }
}

module.exports = new AIService();
