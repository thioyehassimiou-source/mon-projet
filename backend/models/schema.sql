-- Script de Schéma Harmonisé pour GuinéeLogement
-- Basé sur l'implémentation réelle des contrôleurs et du script de seed

-- 1. Table Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'proprietaire', 'locataire')) DEFAULT 'locataire',
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Logements
CREATE TABLE IF NOT EXISTS logements (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    statut VARCHAR(50) DEFAULT 'disponible', -- disponible, loué, suspendu, actif
    images TEXT[],
    exigences JSONB DEFAULT '{}',
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    contenu TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    id_expediteur INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_destinataire INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_logement INTEGER REFERENCES logements(id) ON DELETE SET NULL
);

-- 4. Table Paiements
CREATE TABLE IF NOT EXISTS paiements (
    id SERIAL PRIMARY KEY,
    montant_total DECIMAL(15, 2) NOT NULL,
    commission_plateforme DECIMAL(15, 2) NOT NULL,
    montant_proprietaire DECIMAL(15, 2) NOT NULL,
    methode_paiement VARCHAR(50) NOT NULL, -- orange_money, mtn_money, MOBILE_MONEY
    statut VARCHAR(50) DEFAULT 'en_attente', -- en_attente, réussi, annulé
    reference_externe VARCHAR(255) UNIQUE,
    date_paiement TIMESTAMP,
    id_proprietaire INTEGER REFERENCES users(id) ON DELETE SET NULL,
    id_locataire INTEGER REFERENCES users(id) ON DELETE SET NULL,
    id_logement INTEGER REFERENCES logements(id) ON DELETE SET NULL
);

-- 5. Table Recherches (Historique)
CREATE TABLE IF NOT EXISTS recherches (
    id SERIAL PRIMARY KEY,
    criteres JSONB NOT NULL,
    date_recherche TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Table Recommandations
CREATE TABLE IF NOT EXISTS recommandations (
    id SERIAL PRIMARY KEY,
    score FLOAT DEFAULT 0,
    date_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_logement INTEGER REFERENCES logements(id) ON DELETE CASCADE
);

-- 7. Table Conversations IA
CREATE TABLE IF NOT EXISTS conversations_ia (
    id SERIAL PRIMARY KEY,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Table Messages IA
CREATE TABLE IF NOT EXISTS messages_ia (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20) NOT NULL, -- 'user' ou 'assistant'
    contenu TEXT NOT NULL,
    date_message TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_conversation INTEGER REFERENCES conversations_ia(id) ON DELETE CASCADE
);

-- 9. Table Profil Préférences
CREATE TABLE IF NOT EXISTS profil_preferences (
    id SERIAL PRIMARY KEY,
    budget_max DECIMAL(15, 2),
    localisation_preferee VARCHAR(255),
    type_logement VARCHAR(100),
    autres_criteres JSONB DEFAULT '{}',
    id_utilisateur INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

-- 10. Table Favoris
CREATE TABLE IF NOT EXISTS favoris (
    id SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_logement INTEGER REFERENCES logements(id) ON DELETE CASCADE,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_utilisateur, id_logement)
);

