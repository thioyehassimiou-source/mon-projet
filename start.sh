#!/bin/bash

# ============================================
# Script de Démarrage - GuineaLogement
# ============================================

echo "🌍 Démarrage de GuineaLogement..."
echo ""

# Libérer les ports s'ils sont déjà utilisés
fuser -k 3000/tcp 5173/tcp 2>/dev/null && echo "🔄 Ports libérés" || echo "✅ Ports libres"
sleep 1

# Démarrer le Backend
echo "🚀 Lancement du Backend (port 3000)..."
cd "$(dirname "$0")/backend" && node server.js > /tmp/guinealogement-backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Vérifier le backend
if lsof -i :3000 | grep -q LISTEN; then
    echo "✅ Backend actif sur http://localhost:3000"
else
    echo "❌ Le backend n'a pas démarré. Consultez /tmp/guinealogement-backend.log"
    cat /tmp/guinealogement-backend.log
    exit 1
fi

# Démarrer le Frontend
echo "🎨 Lancement du Frontend (port 5173)..."
cd "$(dirname "$0")/frontend" && npm run dev -- --host > /tmp/guinealogement-frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 4

# Vérifier le frontend
if lsof -i :5173 | grep -q LISTEN; then
    echo "✅ Frontend actif sur http://localhost:5173"
else
    echo "❌ Le frontend n'a pas démarré. Consultez /tmp/guinealogement-frontend.log"
    cat /tmp/guinealogement-frontend.log
    exit 1
fi

echo ""
echo "============================================"
echo "🏠 GuineaLogement est prêt !"
echo ""
echo "   Frontend : http://localhost:5173"
echo "   Backend  : http://localhost:3000"
echo ""
echo "   Logs Backend  : /tmp/guinealogement-backend.log"
echo "   Logs Frontend : /tmp/guinealogement-frontend.log"
echo ""
echo "   Arrêter : kill $BACKEND_PID $FRONTEND_PID"
echo "============================================"
