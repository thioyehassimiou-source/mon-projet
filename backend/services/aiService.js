const { AIChat, Listing } = require('../models');
const { Op } = require('sequelize');

/**
 * Simple Mock AI Service for GuinéeLogement
 * In a real scenario, this would call OpenAI/Groq API
 */
exports.generateAIResponse = async (userID, userMessage, history = []) => {
    // 1. Analysis of user message for keywords (city, price, type)
    const keywords = {
        city: null,
        maxPrice: null,
        propertyType: null,
    };

    if (userMessage.toLowerCase().includes('conakry')) keywords.city = 'Conakry';
    if (userMessage.toLowerCase().includes('dubréka')) keywords.city = 'Dubréka';
    if (userMessage.toLowerCase().includes('appartement')) keywords.propertyType = 'apartment';
    if (userMessage.toLowerCase().includes('maison')) keywords.propertyType = 'house';

    const priceMatch = userMessage.match(/(\d+)\s*(gnf|francs|millions)/i);
    if (priceMatch) {
        keywords.maxPrice = parseInt(priceMatch[1]);
        if (userMessage.toLowerCase().includes('million')) keywords.maxPrice *= 1000000;
    }

    // 2. Fetch matching listings if criteria found
    let recommendations = [];
    if (keywords.city || keywords.maxPrice || keywords.propertyType) {
        const where = {};
        if (keywords.city) where.city = { [Op.iLike]: `%${keywords.city}%` };
        if (keywords.propertyType) where.propertyType = keywords.propertyType;
        if (keywords.maxPrice) where.price = { [Op.lte]: keywords.maxPrice };

        recommendations = await Listing.findAll({
            where,
            limit: 3,
            attributes: ['id', 'title', 'price', 'city']
        });
    }

    // 3. Construct Response
    let responseText = "";
    if (recommendations.length > 0) {
        responseText = `J'ai trouvé quelques logements qui pourraient vous intéresser à ${keywords.city || 'en Guinée'} :\n`;
        recommendations.forEach(r => {
            responseText += `- ${r.title} (${r.price} GNF) à ${r.city}\n`;
        });
        responseText += "\nVoulez-vous plus de détails sur l'un d'entre eux ?";
    } else if (keywords.city || keywords.maxPrice) {
        responseText = "Je n'ai pas trouvé de logements correspondant exactement à vos critères pour le moment, mais je peux vous aider à affiner votre recherche.";
    } else {
        responseText = "Bonjour ! Je suis votre assistant GuinéeLogement. Comment puis-je vous aider dans votre recherche immobilière aujourd'hui ?";
    }

    return {
        content: responseText,
        recommendations: recommendations.map(r => r.id),
        criteria: keywords
    };
};
