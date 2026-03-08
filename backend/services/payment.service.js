const axios = require('axios');

class PaymentService {
    constructor() {
        this.apiKey = process.env.CINETPAY_API_KEY;
        this.siteId = process.env.CINETPAY_SITE_ID;
        this.baseUrl = 'https://api-checkout.cinetpay.com/v2/payment';
    }

    async initiatePayment(data) {
        const { amount, currency, transaction_id, description, customer_name, customer_surname, customer_email, customer_phone_number } = data;

        const payload = {
            apikey: this.apiKey,
            site_id: this.siteId,
            transaction_id: transaction_id,
            amount: amount,
            currency: currency || 'GNF',
            alternative_currency: "",
            description: description,
            customer_name: customer_name,
            customer_surname: customer_surname,
            customer_email: customer_email,
            customer_phone_number: customer_phone_number,
            return_url: `${process.env.FRONTEND_URL}/payment-success`,
            notify_url: `${process.env.BACKEND_URL}/api/paiements/webhook`,
            channels: "ALL",
            lang: "fr"
        };

        try {
            const response = await axios.post(this.baseUrl, payload);
            return response.data;
        } catch (error) {
            console.error("CinetPay Initiation Error:", error.response?.data || error.message);
            throw new Error("Erreur lors de l'initiation du paiement via CinetPay.");
        }
    }

    async verifyPayment(transaction_id) {
        const payload = {
            apikey: this.apiKey,
            site_id: this.siteId,
            transaction_id: transaction_id
        };

        try {
            const response = await axios.post(`${this.baseUrl}/check`, payload);
            return response.data;
        } catch (error) {
            console.error("CinetPay Verification Error:", error.response?.data || error.message);
            throw new Error("Impossible de vérifier le statut du paiement.");
        }
    }
}

module.exports = new PaymentService();
