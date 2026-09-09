import { Router } from 'express';
import { registrarPaciente, listarPacientes } from '../controllers/paciente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoints protegidos con Token JWT
router.post('/', verificarToken, registrarPaciente);
router.get('/', verificarToken, listarPacientes);

export default router;