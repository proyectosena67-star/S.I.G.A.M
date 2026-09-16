import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import citaRoutes from './routes/cita.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import medicamentoRoutes from './routes/medicamento.routes.js';
import  factura from './models/factura.model.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoints principales
app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/factura', facturaRoutes);

export default app;