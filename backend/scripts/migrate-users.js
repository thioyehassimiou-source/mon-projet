require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'guineelogement',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

async function migrate() {
    try {
        console.log('🔄 Migration de la table users...');

        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS id_number VARCHAR(100),
            ADD COLUMN IF NOT EXISTS id_document VARCHAR(255),
            ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
        `);

        console.log('✅ Colonnes de vérification ajoutées/vérifiées.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur de migration :', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

migrate();
