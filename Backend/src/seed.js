import pool from './config/db.js';

const seedDatabase = async () => {
  try {
    console.log('Actualizando credenciales en PostgreSQL...');

    // 1. Roles base
    const rolesQuery = `
      INSERT INTO roles (nombre, descripcion)
      VALUES
        ('Administrador', 'Acceso total al sistema SIGAP'),
        ('Médico', 'Atención de pacientes y registro de historias clínicas'),
        ('Facturador', 'Generación de RIPS, prefacturas y facturación DIAN'),
        ('Recepcionista', 'Admisión y agendamiento de pacientes')
      ON CONFLICT (nombre) DO NOTHING;
    `;
    await pool.query(rolesQuery);

    // 2. Obtener ID del rol Administrador
    const rolRes = await pool.query("SELECT id_rol FROM roles WHERE nombre = 'Administrador'");
    const idRolAdmin = rolRes.rows[0].id_rol;

    // 3. Insertar Admin con contraseña en texto plano
    const adminUserQuery = `
      INSERT INTO usuarios (
        id_rol, tipo_documento, documento, nombres, apellidos, correo, password_hash, estado
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (correo)
      DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        id_rol = EXCLUDED.id_rol;
    `;
   
    await pool.query(adminUserQuery, [
      idRolAdmin,
      'CC',
      '1234567890',
      'Administrador',
      'SIGAP',
      'admin@sigap.com',
      'Admin123*', // Contraseña en texto plano
      'Activo'
    ]);

    console.log('Credenciales de Administrador actualizadas con éxito');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando el seed:', error.message);
    process.exit(1);
  }
};

seedDatabase();


  auth.controller.js  

import { AuthService } from '../services/auth.service.js';

// Iniciar sesión (Login)
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
   
    // Ejecuta la autenticación con correo y clave en texto plano
    const resultado = await AuthService.login(correo, password);
   
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Registro de un nuevo usuario
export const registro = async (req, res) => {
  try {
    const nuevoUsuario = await AuthService.registrar(req.body);
   
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};