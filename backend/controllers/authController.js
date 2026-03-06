const { query } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_par_defaut', {
        expiresIn: '30d',
    });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

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
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, hashedPwd, role || 'locataire']
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

