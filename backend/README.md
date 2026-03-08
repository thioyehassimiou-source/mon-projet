# GuinéeLogement - Backend API (v2.0)

Backend complet développé avec Node.js, Express et PostgreSQL (pg native).

## 🚀 Installation

1. Configurer PostgreSQL et créer la base de données `guinealogement`.
2. Exécuter le script `models/schema.sql` pour créer les tables.
3. Installer les dépendances :
   ```bash
   npm install
   ```
4. Configurer le fichier `.env`.
5. Lancer le serveur :
   ```bash
   npm run dev
   ```

## 📝 Exemples de Requêtes

### 1. Authentification
**Inscription (POST /api/auth/register)**
```json
{
  "nom": "Amdou Diallo",
  "email": "amadou@example.com",
  "mot_de_passe": "password123",
  "role": "proprietaire"
}
```

### 2. Logements
**Créer un logement (POST /api/logements)**
```json
{
  "titre": "Appartement de luxe à Kaloum",
  "description": "3 chambres, vue sur mer",
  "prix": 5000000,
  "localisation": "Conakry, Kaloum",
  "exigences": {"caution": 3, "frais_agence": 1},
  "id_proprietaire": 1
}
```

**Rechercher avec filtres (GET /api/logements?prix_max=6000000&localisation=Kaloum)**

### 3. Messages
**Envoyer un message (POST /api/messages)**
```json
{
  "contenu": "Bonjour, ce logement est-il disponible ?",
  "id_destinataire": 1,
  "id_logement": 1
}
```

### 4. Paiements
**Effectuer un paiement (POST /api/paiements)**
```json
{
  "montant_total": 5000000,
  "methode_paiement": "orange_money",
  "id_logement": 1,
  "id_proprietaire": 1
}
```
*Note : La commission de 10% est calculée automatiquement.*

### 5. IA & Assistant
**Mettre à jour les préférences (PUT /api/ia/preferences)**
```json
{
  "budget_max": 4000000,
  "localisation_preferee": "Ratoma",
  "type_logement": "studio",
  "autres_criteres": {"clim": true}
}
```
