import { Router } from 'express';
import { crearCita, obtenerCitas } from '../controllers/cita.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Proteger todas las rutas de citas con JWT
router.use(verificarToken);

router.post('/', crearCita);
router.get('/', obtenerCitas);

export default router;