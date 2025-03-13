#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log() {
    echo -e "${BLUE}[PLOP]${NC} $1"
}

# Aller dans le dossier frontend
cd frontend || exit

# Lancer un serveur HTTP simple avec Python
if command -v python3 &> /dev/null; then
    log "Démarrage du serveur avec Python 3..."
    log "L'application sera accessible à l'adresse: ${GREEN}http://localhost:8000${NC}"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    log "Démarrage du serveur avec Python 2..."
    log "L'application sera accessible à l'adresse: ${GREEN}http://localhost:8000${NC}"
    python -m SimpleHTTPServer 8000
else
    log "Python n'est pas installé. Installation de python3..."
    sudo apt-get update && sudo apt-get install -y python3
    log "Démarrage du serveur..."
    log "L'application sera accessible à l'adresse: ${GREEN}http://localhost:8000${NC}"
    python3 -m http.server 8000
fi 