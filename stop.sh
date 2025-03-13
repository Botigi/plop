#!/bin/bash

echo "🛑 Arrêt de l'application collaborative..."

# Fonction pour arrêter un processus
stop_process() {
    if pgrep -f "$1" > /dev/null; then
        echo "Arrêt de $2..."
        pkill -f "$1"
        sleep 1
    else
        echo "$2 n'est pas en cours d'exécution"
    fi
}

# Arrêter le backend
stop_process "node.*backend" "Backend"

# Arrêter le frontend
stop_process "vite" "Frontend"

# Note: Nous ne stoppons pas MariaDB car d'autres applications pourraient l'utiliser
echo "ℹ️ MariaDB n'a pas été arrêté car il pourrait être utilisé par d'autres applications"

echo "✅ Tous les services ont été arrêtés." 