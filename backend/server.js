require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 1️⃣ Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3️⃣ Routes API principales

// Test Serveur
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'API GuinéeLogement',
        version: '2.0.0 (Native PG)'
    });
});

// Test Connexion DB
app.get('/test-db', async (req, res) => {
    try {
        const result = await query('SELECT NOW() as now');
        res.json({
            success: true,
            message: 'Connexion PostgreSQL réussie',
            time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const messageRoutes = require('./routes/messageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', userRoutes);
app.use('/api/logements', listingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/paiements', paymentRoutes);
app.use('/api/ia', aiRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Une erreur interne est survenue',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Serveur GuinéeLogement démarré sur le port ${PORT}`);
});
