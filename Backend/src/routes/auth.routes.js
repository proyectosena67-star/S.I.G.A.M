import { Router } from 'express';
import { login, obtenerPerfil } from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta pública para autenticación
router.post('/login', login);

// Ruta protegida para consultar el perfil del usuario autenticado
router.get('/me', verificarToken, obtenerPerfil);

export default router;