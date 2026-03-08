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

    /**
     * Extrait les critères de recherche d'une requête utilisateur au format JSON.
     */
    async extractSearchCriteria(userQuery) {
        if (!this.groq) return { type: null, quartier: null, prix_max: null };

        const extractionPrompt = `
            Tu es un extracteur de données immobilières pour la Guinée.
            Extrais les critères de recherche de la phrase suivante en JSON.
            
            Format attendu :
            {
                "type": "apartment" | "villa" | "studio" | "chambre" | null,
                "quartier": string | null (ex: "Kipé", "Ratoma"),
                "prix_max": number | null (convertis les millions en chiffres, ex: "2 millions" -> 2000000)
            }
            
            Phrase : "${userQuery}"
            RÉPOND UNIQUEMENT LE JSON.
        `;

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [{ role: "user", content: extractionPrompt }],
                model: "mixtral-8x7b-32768",
                temperature: 0,
                response_format: { type: "json_object" }
            });
            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error("Extraction Error:", error.message);
            return { type: null, quartier: null, prix_max: null };
        }
    }

    async generateResponse(userQuery, propertyContext = []) {
        if (!this.groq) {
            return `[SIMULATION GROQ] Vous cherchez : "${userQuery}". Voici des suggestions basées sur nos ${propertyContext.length} logements trouvés...`;
        }

        const contextString = propertyContext.map(p =>
            `- [ID:${p.id}] ${p.titre} | PRIX: ${p.prix} GNF | QUARTIER: ${p.localisation} | TYPE: ${p.exigences?.type || 'N/A'}`
        ).join('\n');

        const systemPrompt = `
            Tu es l'assistant "GuinéeLogement IA".
            Aide l'utilisateur à trouver un logement parmi la liste fournie.
            
            DIRECTIVES :
            1. Cite UNIQUEMENT les logements du CONTEXTE ci-dessous.
            2. Pour chaque logement cité, donne son prix et son quartier.
            3. Si aucun logement ne correspond, suggère d'élargir la recherche.
            4. Réponds de façon chaleureuse et professionnelle.
            
            CONTEXTE :
            ${contextString || "AUCUN LOGEMENT TROUVÉ EN BASE"}
        `;

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userQuery }
                ],
                model: "mixtral-8x7b-32768",
                temperature: 0.3,
            });

            return completion.choices[0]?.message?.content || "Désolé, je ne peux pas répondre pour le moment.";
        } catch (error) {
            console.error("GROQ API Error:", error.message);
            throw new Error("Erreur IA.");
        }
    }
}

module.exports = new AIService();
