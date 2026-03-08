const { Pool } = require('pg');
require('dotenv').config();

// Log database configuration mode at startup
if (process.env.DATABASE_URL) {
    console.log('📦 Database: Using DATABASE_URL (cloud mode)');
} else {
    console.log('🏠 Database: Using individual DB_* env vars (local mode)');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}, DB: ${process.env.DB_NAME || 'guineelogement'}`);
}

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

// Test de connexion
pool.on('connect', () => {
    console.log('✅ Connecté à la base de données PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Erreur inattendue du client PostgreSQL:', err.message);
    // Ne pas quitter le process pour éviter que Render tue le service
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
