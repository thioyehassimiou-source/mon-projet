const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!process.env.JWT_SECRET) {
                console.error("❌ CRITICAL: JWT_SECRET is not defined in .env");
                return res.status(500).json({ message: "Erreur de configuration serveur" });
            }

            // Correction : table 'users' au lieu de 'utilisateurs'
            const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.id]);
            req.user = result.rows[0];


            if (!req.user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Non autorisé, token échoué' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Non autorisé, pas de token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
