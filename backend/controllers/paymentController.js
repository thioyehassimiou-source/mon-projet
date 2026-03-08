const { query } = require('../config/database');
const paymentService = require('../services/payment.service');

exports.initiatePayment = async (req, res) => {
    const { amount, id_logement, description } = req.body;
    const userId = req.user.id;

    try {
        // 1. Récupérer l'ID du propriétaire du logement (Sécurité/Traçabilité)
        const listing = await query('SELECT owner_id FROM logements WHERE id = $1', [id_logement]);
        if (listing.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Logement non trouvé' });
        }
        const id_proprietaire = listing.rows[0].owner_id;

        // 2. Créer une référence de transaction unique
        const transaction_id = `GL-${Date.now()}-${userId}`;

        // 3. Préparer les données pour CinetPay
        const paymentData = {
            amount,
            transaction_id,
            description: description || `Paiement pour logement #${id_logement}`,
            customer_name: req.user.name.split(' ')[0],
            customer_surname: req.user.name.split(' ')[1] || '',
            customer_email: req.user.email,
            customer_phone_number: req.user.phone || ''
        };

        // 4. Initier le paiement
        const result = await paymentService.initiatePayment(paymentData);

        if (result.code === '201') {
            // 5. Sauvegarder la transaction avec id_proprietaire
            await query(
                `INSERT INTO paiements (montant_total, commission_plateforme, montant_proprietaire, methode_paiement, statut, reference_externe, id_locataire, id_proprietaire, id_logement)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [amount, amount * 0.1, amount * 0.9, 'MOBILE_MONEY', 'en_attente', transaction_id, userId, id_proprietaire, id_logement]
            );

            res.status(200).json({
                success: true,
                payment_url: result.data.payment_url,
                transaction_id
            });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error("Payment Initiation Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    const { cpm_trans_id, cpm_status, cpm_site_id } = req.body;

    // Sécurité supplémentaire : Vérifier que le site_id correspond
    if (cpm_site_id !== process.env.CINETPAY_SITE_ID) {
        console.warn(`⚠️ Tentative de webhook frauduleux (site_id incorrect): ${cpm_site_id}`);
        return res.status(403).send('Forbidden');
    }

    try {
        if (cpm_status === 'ACCEPTED') {
            await query(
                "UPDATE paiements SET statut = 'réussi', date_paiement = NOW() WHERE reference_externe = $1",
                [cpm_trans_id]
            );
            console.log(`✅ Paiement réussi pour la transaction: ${cpm_trans_id}`);
        } else {
            await query(
                "UPDATE paiements SET statut = 'annulé' WHERE reference_externe = $1",
                [cpm_trans_id]
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
