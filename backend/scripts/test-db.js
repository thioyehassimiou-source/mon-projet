require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'guineelogement',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

console.log(`📡 Tentative de connexion à : ${process.env.DB_NAME || 'guineelogement'}...`);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Connexion échouée :', err.message);
        process.exit(1);
    } else {
        console.log('✅ Connexion réussie à la base de données PostgreSQL');
        process.exit(0);
    }
});
