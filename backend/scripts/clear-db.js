/**
 * CLEAR DATABASE SCRIPT - GuinéeLogement
 * ----------------------------
 * Vider toutes les tables de la base de données avant le déploiement en production.
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'guineelogement',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

async function clearDatabase() {
    console.log('🧹 Nettoyage de la base de données en cours...');
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        console.log('--- Suppression de toutes les données ---');
        await client.query(`
            TRUNCATE TABLE 
                favoris, 
                recommandations, 
                recherches, 
                messages_ia, 
                conversations_ia, 
                profil_preferences, 
                paiements, 
                messages, 
                logements, 
                users 
            RESTART IDENTITY CASCADE;
        `);

        await client.query('COMMIT');
        console.log('✅ Base de données vidée avec succès !');
        process.exit(0);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Erreur lors du nettoyage :', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

clearDatabase();
