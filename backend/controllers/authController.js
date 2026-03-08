const { query } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET non configuré dans l'environnement");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password, role, phone, first_name, last_name, user_type, id_number } = req.body;
    const finalName = name || `${first_name || ''} ${last_name || ''}`.trim();

    // Validation des entrées
    if (!finalName || finalName.length < 2) {
        return res.status(400).json({ message: 'Le nom doit contenir au moins 2 caractères' });
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Email invalide' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    if (phone && !/^\+?[0-9\s-]{8,}$/.test(phone)) {
        return res.status(400).json({ message: 'Numéro de téléphone invalide' });
    }

    // Mappage des rôles
    let finalRole = role || user_type || 'locataire';
    if (finalRole === 'tenant') finalRole = 'locataire';
    if (finalRole === 'owner' || finalRole === 'agency') finalRole = 'proprietaire';

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExist = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        // Insérer l'utilisateur
        const newUser = await query(
            'INSERT INTO users (name, email, password, role, phone, id_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, phone',
            [finalName, email, hashedPwd, finalRole, phone, id_number]
        );

        const user = newUser.rows[0];
        res.status(201).json({
            ...user,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Connexion de l'utilisateur
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe invalide' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtenir le profil de l'utilisateur connecté
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
    try {
        const result = await query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Profil non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Uploader un document KYC
// @route   POST /api/auth/upload-kyc
exports.uploadKYCDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }

    try {
        const filePath = `/uploads/kyc/${req.file.filename}`;
        await query(
            'UPDATE users SET id_document = $1, is_verified = FALSE WHERE id = $2',
            [filePath, req.user.id]
        );

        res.json({
            message: 'Document KYC téléchargé avec succès. En attente de validation.',
            id_document: filePath
        });
    } catch (error) {
        console.error("KYC Upload Error:", error);
        res.status(500).json({ message: error.message });
    }
};

