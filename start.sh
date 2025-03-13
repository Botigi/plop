#!/bin/bash

echo "🚀 Démarrage de l'application collaborative..."

# Fonction pour vérifier si un port est utilisé
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# Arrêter les processus existants
echo "🧹 Nettoyage des processus existants..."
pkill -f "node.*backend" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Vérifier si les ports sont libres
if check_port 3001; then
    echo "❌ Le port 3001 est toujours utilisé. Utilisez 'sudo lsof -i:3001' pour voir quel processus l'utilise."
    exit 1
fi

# Démarrer MariaDB si ce n'est pas déjà fait
echo "📊 Vérification de MariaDB..."
if ! mysqladmin ping -s 2>/dev/null; then
    echo "🔄 Démarrage de MariaDB..."
    sudo service mariadb start
    sleep 2
    
    # Vérifier si MariaDB est bien démarré
    for i in {1..5}; do
        if mysqladmin ping -s 2>/dev/null; then
            echo "✅ MariaDB est démarré et répond"
            break
        fi
        if [ $i -eq 5 ]; then
            echo "❌ Erreur: MariaDB n'a pas démarré correctement après 5 tentatives"
            exit 1
        fi
        echo "⏳ Attente du démarrage de MariaDB... tentative $i/5"
        sleep 2
    done
else
    echo "✅ MariaDB est déjà en cours d'exécution"
fi

# Démarrer le backend
echo "🔧 Démarrage du backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances du backend..."
    npm install
fi
npm run dev &

# Attendre que le backend soit prêt
sleep 5

# Démarrer le frontend
echo "🎨 Démarrage du frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances du frontend..."
    npm install
fi
npm run dev

# Si le script est interrompu, arrêter tous les processus
trap 'echo "🛑 Arrêt des services..."; ./stop.sh' INT TERM 