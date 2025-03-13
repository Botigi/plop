import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './config/database';
import courseRoutes from './routes/courseRoutes';
import { config } from './config/config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: config.cors
});

// Middleware
app.use(express.json());
app.use(cors(config.cors));

// Routes
app.use('/api/courses', courseRoutes);

// Initialisation de la base de données
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connexion à la base de données établie');
    
    // Démarrage du serveur une fois la base de données connectée
    const PORT = config.port || 3001;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erreur lors de la connexion à la base de données:', error);
    process.exit(1);
  });

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('👤 Utilisateur connecté:', socket.id);

  socket.on('disconnect', () => {
    console.log('👋 Utilisateur déconnecté:', socket.id);
  });
});
