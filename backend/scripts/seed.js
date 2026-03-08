/**
 * SEED SCRIPT V3 - GuinéeLogement
 * ----------------------------
 * Initialise la base de données avec des données réalistes guinéennes.
 * Parse le schema.sql pour créer toutes les tables avant d'insérer.
 */

require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'guineelogement',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

async function seed() {
    console.log('🚀 Démarrage du processus de seeding V3...');
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1️⃣ SUPPRIMER TOUTES LES TABLES dans l'ordre des dépendances
        console.log('--- 1. Suppression des tables existantes ---');
        await client.query(`
            DROP TABLE IF EXISTS favoris CASCADE;
            DROP TABLE IF EXISTS recommandations CASCADE;
            DROP TABLE IF EXISTS recherches CASCADE;
            DROP TABLE IF EXISTS messages_ia CASCADE;
            DROP TABLE IF EXISTS conversations_ia CASCADE;
            DROP TABLE IF EXISTS profil_preferences CASCADE;
            DROP TABLE IF EXISTS paiements CASCADE;
            DROP TABLE IF EXISTS messages CASCADE;
            DROP TABLE IF EXISTS logements CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);

        // 2️⃣ RECRÉER TOUTES LES TABLES depuis le schéma
        console.log('--- 2. Application du schéma SQL ---');
        const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schema);
        console.log('✅ Schéma appliqué avec succès.');

        // 3️⃣ CRÉATION DES UTILISATEURS
        console.log('--- 3. Création des utilisateurs ---');
        const pass = bcrypt.hashSync('password123', 10);

        const adminRes = await client.query(
            "INSERT INTO users (name, email, password, role, phone) VALUES ('Admin GuineaLogement', 'admin@gl.gn', $1, 'admin', '+224 666 00 00 00') RETURNING id",
            [pass]
        );

        const ownerData = [
            { name: 'Mamadou Alpha Diallo', email: 'mamadou.diallo@gl.gn', phone: '+224 620 11 22 33' },
            { name: 'Mariama Sylla', email: 'mariama.sylla@gl.gn', phone: '+224 621 44 55 66' },
            { name: 'Ibrahim Keita', email: 'ibrahim.keita@gl.gn', phone: '+224 666 77 88 99' },
        ];

        const owners = [];
        for (const o of ownerData) {
            const res = await client.query(
                "INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, 'proprietaire', $4) RETURNING id",
                [o.name, o.email, pass, o.phone]
            );
            owners.push(res.rows[0].id);
        }

        const locataireRes = await client.query(
            "INSERT INTO users (name, email, password, role, phone) VALUES ('Aissatou Barry', 'aissatou.barry@gl.gn', $1, 'locataire', '+224 628 12 34 56') RETURNING id",
            [pass]
        );

        console.log(`✅ ${owners.length + 2} utilisateurs créés.`);

        // 4️⃣ CRÉATION DES LOGEMENTS
        const imagesByType = {
            apartment: [
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
                'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
            ],
            villa: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
            ],
            studio: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
            ],
            concession: [
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
            ],
            chambre: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
            ],
        };

        const quartiers = [
            { name: 'Kaloum, Conakry' },
            { name: 'Ratoma, Conakry' },
            { name: 'Lambanyi, Conakry' },
            { name: 'Kipé, Conakry' },
            { name: 'Dixinn, Conakry' },
            { name: 'Matam, Conakry' },
            { name: 'Matoto, Conakry' },
            { name: 'Coyah' },
            { name: 'Dubréka' },
            { name: 'Kindia' },
            { name: 'Labé' },
            { name: 'Kankan' },
            { name: "N'Zérékoré" },
        ];

        const typeModels = [
            {
                base: 'Appartement moderne',
                cat: 'apartment',
                descTemplate: (q) => `Superbe appartement moderne situé à ${q}. Bien éclairé, ventilé et sécurisé avec gardien 24h/24. Proche des commerces, transports et écoles.`,
                minPrice: 1500000, maxPrice: 8000000,
            },
            {
                base: 'Villa de standing',
                cat: 'villa',
                descTemplate: (q) => `Magnifique villa de standing dans un quartier calme de ${q}. Jardin privatif, parking gardé, groupe électrogène et château d'eau inclus.`,
                minPrice: 5000000, maxPrice: 25000000,
            },
            {
                base: 'Studio meublé',
                cat: 'studio',
                descTemplate: (q) => `Studio entièrement meublé à ${q}. Idéal pour étudiant ou professionnel. Cuisine équipée, wifi inclus. Accès facile aux axes principaux.`,
                minPrice: 500000, maxPrice: 2000000,
            },
            {
                base: 'Chambre simple',
                cat: 'chambre',
                descTemplate: (q) => `Chambre simple propre et sécurisée à ${q}. Eau et électricité incluses. Salle de bain commune partagée. Quartier calme et bien desservi.`,
                minPrice: 200000, maxPrice: 800000,
            },
            {
                base: 'Grande concession',
                cat: 'concession',
                descTemplate: (q) => `Grande concession familiale à ${q}. Plusieurs bâtiments, grand espace extérieur et arbre fruitier. Possibilité de sous-location.`,
                minPrice: 3000000, maxPrice: 15000000,
            },
        ];

        console.log('--- 4. Insertion de 40 annonces réalistes ---');
        for (let i = 1; i <= 40; i++) {
            const q = quartiers[Math.floor(Math.random() * quartiers.length)];
            const typeModel = typeModels[Math.floor(Math.random() * typeModels.length)];
            const ownerId = owners[Math.floor(Math.random() * owners.length)];
            const price = Math.floor(Math.random() * (typeModel.maxPrice - typeModel.minPrice + 1) + typeModel.minPrice);
            const imgs = imagesByType[typeModel.cat];
            const selectedImage = imgs[Math.floor(Math.random() * imgs.length)];

            const exigences = {
                type: typeModel.cat,
                chambres: typeModel.cat === 'studio' ? 1 : Math.floor(Math.random() * 4) + 1,
                salles_de_bain: typeModel.cat === 'studio' ? 1 : Math.floor(Math.random() * 2) + 1,
                surface: Math.floor(Math.random() * 120) + 20,
                caution: '2 mois',
                meuble: Math.random() > 0.5,
                eau: true,
                electricite: true,
                wifi: typeModel.cat === 'studio' && Math.random() > 0.5,
                groupe_electrogene: typeModel.cat === 'villa' && Math.random() > 0.4,
            };

            await client.query(
                `INSERT INTO logements (titre, description, price, localisation, statut, images, exigences, owner_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    `${typeModel.base} à ${q.name}`,
                    typeModel.descTemplate(q.name),
                    price,
                    q.name,
                    'disponible',
                    [selectedImage],
                    exigences,
                    ownerId,
                ]
            );
        }

        await client.query('COMMIT');
        console.log(`\n✅ Seeding V3 terminé avec succès !`);
        console.log(`\n📧 Comptes de test :`);
        console.log(`   Admin  : admin@gl.gn / password123`);
        console.log(`   Proprio: mamadou.diallo@gl.gn / password123`);
        console.log(`   Locataire: aissatou.barry@gl.gn / password123`);
        process.exit(0);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Erreur lors du seeding :', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
