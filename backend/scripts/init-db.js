require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Support DATABASE_URL for cloud (Render) or individual vars for local
const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'guineelogement',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

async function init() {
    try {
        console.log('🔗 Mode:', process.env.DATABASE_URL ? 'Cloud (DATABASE_URL)' : 'Local');
        console.log('🔍 Vérification des tables existantes...');
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        if (res.rows.length > 0) {
            console.log('📝 Tables existantes:', res.rows.map(r => r.table_name).join(', '));
        }

        console.log('🚀 Initialisation/Mise à jour de la base de données...');

        const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        await pool.query(schema);
        console.log('✅ Schéma appliqué avec succès.');

        // Vérifier les tables créées
        const tablesAfter = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        console.log('📋 Tables après migration:', tablesAfter.rows.map(r => r.table_name).join(', '));

        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur lors de l\'initialisation :', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

init();
