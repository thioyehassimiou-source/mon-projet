const { query } = require('../config/database');
require('dotenv').config({ path: '../.env' });

async function fixListingStatus() {
    console.log('🚀 Démarrage de la correction des statuts des logements...');

    try {
        // 1. Vérifier le nombre de logements en attente
        const checkResult = await query("SELECT count(*) FROM logements WHERE statut = 'en_attente'");
        const count = checkResult.rows[0].count;

        console.log(`📊 Logements actuellement en attente : ${count}`);

        if (count === "0") {
            console.log('✅ Aucun logement en attente trouvé. Tout semble correct.');
            process.exit(0);
        }

        // 2. Mettre à jour tous les statuts à 'disponible'
        const updateResult = await query("UPDATE logements SET statut = 'disponible' WHERE statut = 'en_attente' OR statut IS NULL RETURNING id");

        console.log(`✅ Mise à jour réussie ! ${updateResult.rows.length} logements sont maintenant disponibles.`);

    } catch (error) {
        console.error('❌ Erreur lors de la correction des statuts :', error);
    } finally {
        process.exit();
    }
}

fixListingStatus();
