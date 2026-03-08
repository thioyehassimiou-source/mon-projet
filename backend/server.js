require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 1️⃣ Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    process.env.FRONTEND_URL,
    'https://guinealogement.app'
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Service des fichiers statiques (Uploads) - Aligné avec /api pour simplicité frontend
const path = require('path');
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

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
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', userRoutes);
app.use('/api/logements', listingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/paiements', paymentRoutes);
app.use('/api/ia', aiRoutes);
app.use('/api/admin', adminRoutes);

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
