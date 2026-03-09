/**
 * SEED MVP DEMO - GuineaLogement
 * ----------------------------
 * Initialise la base de données avec des données de démonstration pour le test public.
 */

require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Support DATABASE_URL for cloud (Render) or individual vars for local
const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'guineelogement',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

async function seed() {
    console.log('🚀 Démarrage du Seeding Démo MVP...');
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Nettoyage rapide (optionnel, mais recommandé pour une démo propre)
        console.log('--- Nettoyage des anciennes annonces de démo ---');
        await client.query("DELETE FROM logements WHERE description LIKE '%Annonce de démonstration%'");

        // Récupérer un propriétaire existant ou en créer un
        let ownerRes = await client.query("SELECT id FROM users WHERE email = 'mamadou.diallo@gl.gn'");
        let ownerId;

        if (ownerRes.rows.length > 0) {
            ownerId = ownerRes.rows[0].id;
        } else {
            console.log('--- Création du compte propriétaire démo ---');
            const pass = await bcrypt.hash('password123', 10);
            const newOwner = await client.query(
                "INSERT INTO users (name, email, password, role, phone) VALUES ('Mamadou Alpha Diallo', 'mamadou.diallo@gl.gn', $1, 'proprietaire', '+224 620 11 22 33') RETURNING id",
                [pass]
            );
            ownerId = newOwner.rows[0].id;
        }

        const disclaimer = "\n\nAnnonce de démonstration pour test de la plateforme GuineaLogement.";

        const demoListings = [
            {
                titre: "Appartement de luxe à Kipé",
                desc: "Magnifique appartement de 3 chambres avec vue sur mer. Salon spacieux, cuisine moderne équipée." + disclaimer,
                price: 7500000,
                loc: "Kipé, Ratoma, Conakry",
                type: "apartment",
                premium: true,
                verified: true,
                rooms: 3,
                baths: 2,
                img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
            },
            {
                titre: "Studio moderne à Lambanyi",
                desc: "Studio meublé idéal pour expatrié ou jeune couple. Sécurisé, eau et électricité 24/7." + disclaimer,
                price: 4500000,
                loc: "Lambanyi, Ratoma, Conakry",
                type: "studio",
                premium: true,
                verified: false,
                rooms: 1,
                baths: 1,
                img: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80"
            },
            {
                titre: "Villa avec piscine à Nongo",
                desc: "Grande villa familiale avec 5 chambres, jardin et piscine. Parking pour 3 voitures." + disclaimer,
                price: 15000000,
                loc: "Nongo, Ratoma, Conakry",
                type: "villa",
                premium: true,
                verified: true,
                rooms: 5,
                baths: 4,
                img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80"
            },
            {
                titre: "Appartement F4 à Camayenne",
                desc: "Appartement spacieux au centre-ville. Proche de toutes commodités." + disclaimer,
                price: 6000000,
                loc: "Camayenne, Dixinn, Conakry",
                type: "apartment",
                premium: false,
                verified: true,
                rooms: 4,
                baths: 2,
                img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
            },
            {
                titre: "Chambre climatisée à Matoto",
                desc: "Chambre confortable avec climatisation et salle de bain privée." + disclaimer,
                price: 1200000,
                loc: "Sangoyah, Matoto, Conakry",
                type: "chambre",
                premium: false,
                verified: false,
                rooms: 1,
                baths: 1,
                img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80"
            },
            {
                titre: "Duplex moderne à Sonfonia",
                desc: "Duplex neuf avec finitions haut de gamme. Quartier calme et résidentiel." + disclaimer,
                price: 9000000,
                loc: "Centre, Sonfonia, Conakry",
                type: "villa",
                premium: true,
                verified: false,
                rooms: 4,
                baths: 3,
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
            },
            {
                titre: "Appartement économique à Kagbelen",
                desc: "Appartement propre et abordable. Idéal pour petite famille." + disclaimer,
                price: 2500000,
                loc: "Plateau, Kagbelen, Dubréka",
                type: "apartment",
                premium: false,
                verified: false,
                rooms: 2,
                baths: 1,
                img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
            },
            {
                titre: "Bureaux à louer à Kaloum",
                desc: "Espace professionnel au coeur du quartier des affaires." + disclaimer,
                price: 12000000,
                loc: "Almamyah, Kaloum, Conakry",
                type: "concession",
                premium: true,
                verified: true,
                rooms: 6,
                baths: 2,
                img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
            },
            {
                titre: "Villa de charme à Labé",
                desc: "Belle villa située dans les hauteurs de Labé. Climat agréable, jardin fleuri." + disclaimer,
                price: 3500000,
                loc: "Tata, Labé, Moyenne Guinée",
                type: "villa",
                premium: true,
                verified: true,
                rooms: 4,
                baths: 2,
                img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
            },
            {
                titre: "Appartement moderne à Kankan",
                desc: "Appartement neuf proche de l'université. Idéal pour enseignants ou professionnels." + disclaimer,
                price: 2000000,
                loc: "Salamani, Kankan, Haute Guinée",
                type: "apartment",
                premium: false,
                verified: true,
                rooms: 3,
                baths: 1,
                img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80"
            },
            {
                titre: "Concession commerciale à Kindia",
                desc: "Emplacement stratégique pour commerce ou entrepôt à l'entrée de la ville." + disclaimer,
                price: 5000000,
                loc: "Gare, Kindia, Basse Guinée",
                type: "concession",
                premium: true,
                verified: false,
                rooms: 5,
                baths: 1,
                img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
            },
            {
                titre: "Chambre d'hôte à Mamou",
                desc: "Chambre confortable pour voyageurs de passage. Proche de la gare routière." + disclaimer,
                price: 150000,
                loc: "Boulbinet, Mamou, Moyenne Guinée",
                type: "chambre",
                premium: false,
                verified: false,
                rooms: 1,
                baths: 1,
                img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
            },
            {
                titre: "Maison familiale à Faranah",
                desc: "Maison spacieuse avec grand terrain. Quartier calme." + disclaimer,
                price: 1800000,
                loc: "Abattoir, Faranah, Haute Guinée",
                type: "villa",
                premium: false,
                verified: false,
                rooms: 3,
                baths: 1,
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
            }
        ];

        // Dupliquer pour atteindre une trentaine d'annonces
        const fullList = [...demoListings, ...demoListings.map(l => ({ ...l, titre: l.titre + " (Bis)" }))];

        console.log(`--- Insertion de ${fullList.length} annonces de démo ---`);

        for (const l of fullList) {
            const exigences = {
                type: l.type,
                chambres: l.rooms,
                salles_de_bain: l.baths,
                surface: Math.floor(Math.random() * 100) + 30,
                eau: true,
                electricite: true
            };

            await client.query(
                `INSERT INTO logements (titre, description, price, localisation, images, exigences, owner_id, is_premium, is_verified, statut)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'disponible')`,
                [l.titre, l.desc, l.price, l.loc, [l.img], exigences, ownerId, l.premium, l.verified]
            );
        }

        await client.query('COMMIT');
        console.log('✅ Seeding Démo terminé !');
        process.exit(0);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Erreur Seeding :', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
