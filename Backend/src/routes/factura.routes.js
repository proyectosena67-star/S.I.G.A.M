import { Router } from 'express';
import { getFacturas, createFactura } from '../controllers/factura.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';
// (Opcional) Si creas un middleware de validación para facturas, lo importas aquí:
// import { validarFactura } from '../middlewares/factura.middleware.js';

const router = Router();

// 1. Obtener todas las facturas (Solo permitido para Administradores y personal autorizado)
router.get(
  '/', 
  [verificarToken, permitirRoles('ADMIN', 'ADMISIONES')], 
  getFacturas
);

// 2. Registrar/Crear una nueva factura
router.post(
  '/', 
  [verificarToken, permitirRoles('ADMIN', 'ADMISIONES') /*, validarFactura*/], 
  createFactura
);

export default router;