import express from 'express';
import cors from 'cors';

// Importación de rutas modulares
import authRoutes from './routes/auth.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import citaRoutes from './routes/cita.routes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de verificación de estado del servidor (Health check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API SIGAP funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Registro de enrutadores principales
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);

// Manejo de endpoints no encontrados (404)
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'La ruta o endpoint solicitado no existe en el servidor SIGAP'
  });
});

export default app;