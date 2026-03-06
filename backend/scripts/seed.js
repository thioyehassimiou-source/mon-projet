/**
 * SEED SCRIPT V2 - GuinéeLogement
 * ----------------------------
 * Ce script initialise la base de données PostgreSQL avec des images réalistes
 * et une structure de données harmonisée avec le frontend.
 */

const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

async function seed() {
    console.log('🚀 Démarrage du processus de seeding V2...');

    try {
        // 1️⃣ RÉINITIALISATION
        console.log('--- 1. Réinitialisation des tables ---');
        await pool.query('DROP TABLE IF EXISTS logements CASCADE;');
        await pool.query('DROP TABLE IF EXISTS users CASCADE;');

        // Création USERS
        await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role VARCHAR(50) CHECK (role IN ('admin', 'proprietaire', 'locataire')) NOT NULL,
                password VARCHAR(255) NOT NULL,
                photo VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Création LOGEMENTS (ajout de statut, images, surface)
        await pool.query(`
            CREATE TABLE logements (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(255) NOT NULL,
                price DECIMAL(15, 2) NOT NULL,
                localisation VARCHAR(255) NOT NULL,
                statut VARCHAR(50) DEFAULT 'actif',
                images TEXT[],
                exigences JSONB DEFAULT '{}',
                owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Tables créées.');

        // 2️⃣ CRÉATION DES UTILISATEURS
        const pass = bcrypt.hashSync('password123', 10);

        // Admin & Owners
        const adminId = (await pool.query("INSERT INTO users (name, email, role, password) VALUES ('Admin', 'admin@gl.gn', 'admin', $1) RETURNING id", [pass])).rows[0].id;

        const owners = [];
        const ownerNames = ['Mamadou Diallo', 'Mariama Sylla', 'Ibrahim Keita'];
        for (const name of ownerNames) {
            const res = await pool.query("INSERT INTO users (name, email, role, password) VALUES ($1, $2, 'proprietaire', $3) RETURNING id", [name, name.toLowerCase().replace(' ', '') + '@gl.gn', pass]);
            owners.push(res.rows[0].id);
        }

        // 3️⃣ DONNÉES RÉALISTES
        const imagesByType = {
            apartment: [
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
            ],
            villa: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80'
            ],
            studio: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
            ]
        };

        const quartiers = [
            { name: 'Kaloum', lat: 9.509, lng: -13.712 },
            { name: 'Ratoma', lat: 9.601, lng: -13.626 },
            { name: 'Lambanyi', lat: 9.625, lng: -13.585 },
            { name: 'Kipé', lat: 9.585, lng: -13.630 },
            { name: 'Dixinn', lat: 9.544, lng: -13.674 }
        ];

        const types = [
            { t: 'Appartement de luxe', imgIdx: 0, cat: 'apartment' },
            { t: 'Villa avec piscine', imgIdx: 1, cat: 'villa' },
            { t: 'Studio moderne meublé', imgIdx: 2, cat: 'studio' }
        ];

        console.log('--- 3. Insertion de 40 annonces ---');
        for (let i = 1; i <= 40; i++) {
            const q = quartiers[Math.floor(Math.random() * quartiers.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const ownerId = owners[Math.floor(Math.random() * owners.length)];
            const price = Math.floor(Math.random() * (15000000 - 800000 + 1) + 800000);

            // Correction : Utiliser imagesByType avec la catégorie correspondante
            const categoryImages = imagesByType[type.cat];
            const selectedImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];

            const record = {
                titre: `${type.t} à ${q.name}`,
                price: price,
                localisation: q.name,
                statut: 'actif',
                images: [selectedImage],
                exigences: {
                    type: type.cat,
                    chambres: Math.floor(Math.random() * 4) + 1,
                    salles_de_bain: Math.floor(Math.random() * 2) + 1,
                    surface: Math.floor(Math.random() * 100) + 30,
                    caution: '3 mois',
                    gps: { lat: q.lat + (Math.random() - 0.5) * 0.01, lng: q.lng + (Math.random() - 0.5) * 0.01 }
                }
            };

            await pool.query(
                `INSERT INTO logements (titre, price, localisation, statut, images, exigences, owner_id) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [record.titre, record.price, record.localisation, record.statut, record.images, record.exigences, ownerId]
            );
        }

        console.log('✅ Seeding terminé avec succès !');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur :', err);
        process.exit(1);
    }
}

seed();
