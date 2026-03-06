require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'guineelogement',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

async function init() {
    try {
        console.log('🔍 Vérification des tables existantes...');
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        if (res.rows.length > 0) {
            console.log('📝 Des tables existent déjà. Application du schéma (IF NOT EXISTS)...');
        }

        console.log('🚀 Initialisation/Mise à jour de la base de données...');

        const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Exécution du schéma (il contient plusieurs commandes, psql gère bien mais pg.query peut avoir des limites si non géré correctement)
        // Heureusement, Pool.query peut exécuter plusieurs commandes SQL séparées par des points-virgules.
        await pool.query(schema);
        console.log('✅ Schéma appliqué avec succès.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur lors de l\'initialisation :', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

init();
