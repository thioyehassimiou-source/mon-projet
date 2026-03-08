const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'guinealogement',
    password: '121006',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Connexion échouée (password: 121006) :', err.message);
        process.exit(1);
    } else {
        console.log('✅ Connexion réussie (password: 121006)');
        process.exit(0);
    }
});
