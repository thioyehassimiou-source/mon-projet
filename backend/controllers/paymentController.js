const { query } = require('../config/database');
const landopayService = require('../services/landopay.service');

exports.initiatePayment = async (req, res) => {
    const { amount, id_logement, description } = req.body;
    const userId = req.user.id;

    try {
        // 1. Récupérer l'ID du propriétaire
        const listing = await query('SELECT owner_id, titre FROM logements WHERE id = $1', [id_logement]);
        if (listing.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Logement non trouvé' });
        }
        const id_proprietaire = listing.rows[0].owner_id;
        const listing_title = listing.rows[0].titre;

        // 2. Créer une référence unique
        const transaction_id = `LP-${Date.now()}-${userId}`;

        // 3. Préparer les données pour LandoPay
        const paymentData = {
            amount,
            transaction_id,
            description: description || `Réservation : ${listing_title}`,
            customer_name: req.user.name,
            customer_email: req.user.email,
            customer_phone_number: req.user.phone || ''
        };

        // 4. Initier le paiement via LandoPay
        const result = await landopayService.initiatePayment(paymentData);

        // On accepte soit un code 201 (standard) soit un flag success
        if (result.success || result.code === '201' || result.status === 'success') {
            const paymentUrl = result.payment_url || (result.data && result.data.payment_url);

            // 5. Sauvegarder la transaction
            await query(
                `INSERT INTO paiements (montant_total, commission_plateforme, montant_proprietaire, methode_paiement, statut, reference_externe, id_locataire, id_proprietaire, id_logement)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [amount, amount * 0.1, amount * 0.9, 'MOBILE_MONEY', 'en_attente', transaction_id, userId, id_proprietaire, id_logement]
            );

            res.status(200).json({
                success: true,
                payment_url: paymentUrl,
                transaction_id
            });
        } else {
            res.status(400).json({ success: false, message: result.message || "Erreur LandoPay" });
        }
    } catch (error) {
        console.error("Payment Initiation Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    // Adapter selon la structure réelle de LandoPay quand elle sera connue
    // Pour l'instant on utilise des noms de champs génériques
    const { transaction_id, status, reference } = req.body;

    try {
        const transId = transaction_id || reference;

        if (status === 'SUCCESS' || status === 'COMPLETED' || status === 'ACCEPTED') {
            await query(
                "UPDATE paiements SET statut = 'réussi', date_paiement = NOW() WHERE reference_externe = $1",
                [transId]
            );
            console.log(`✅ Paiement réussi : ${transId}`);
        } else {
            await query(
                "UPDATE paiements SET statut = 'annulé' WHERE reference_externe = $1",
                [transId]
            );
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send('Error');
    }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM paiements WHERE id_locataire = $1 OR id_proprietaire = $1 ORDER BY date_paiement DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
