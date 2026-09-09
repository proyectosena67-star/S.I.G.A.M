import express from 'express';
import cors from 'cors';

// Importación de Rutas Modulares
import authRoutes from './routes/auth.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';

const app = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());

// Endpoint de Verificación de Salud del Servidor
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API SIGAP funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Registrar Enrutadores de la API
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);

// Manejo de Rutas No Encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'La ruta o endpoint solicitado no existe en el servidor SIGAP'
  });
});

export default app;