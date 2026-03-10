const axios = require('axios');

class LandoPayService {
    constructor() {
        // Ces variables devront être configurées sur Render
        this.apiKey = process.env.LANDOPAY_API_KEY;
        this.baseUrl = process.env.LANDOPAY_API_URL || 'https://api.landopay.com/v1';
    }

    /**
     * Initie un paiement avec LandoPay
     */
    async initiatePayment(data) {
        const { amount, transaction_id, description, customer_email, customer_phone_number } = data;

        // Structure typique pour LandoPay (à adapter si nécessaire)
        const payload = {
            amount: amount,
            currency: 'GNF',
            external_id: transaction_id,
            description: description,
            customer: {
                email: customer_email,
                phone: customer_phone_number
            },
            redirect_url: `${process.env.FRONTEND_URL}/payment-success`,
            callback_url: `${process.env.BACKEND_URL}/api/paiements/webhook`
        };

        try {
            // Note: Si l'API est gratuite et directe, elle peut nécessiter des headers spécifiques
            const response = await axios.post(`${this.baseUrl}/payments/initialize`, payload, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            // Retourne l'URL de paiement ou les données d'initialisation
            return response.data;
        } catch (error) {
            console.error("LandoPay Error:", error.response?.data || error.message);
            throw new Error(`LandoPay: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Vérifie le statut d'un paiement
     */
    async verifyPayment(transaction_id) {
        try {
            const response = await axios.get(`${this.baseUrl}/payments/verify/${transaction_id}`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error("LandoPay Verification Error:", error.response?.data || error.message);
            throw new Error("Impossible de vérifier le paiement LandoPay.");
        }
    }
}

module.exports = new LandoPayService();
