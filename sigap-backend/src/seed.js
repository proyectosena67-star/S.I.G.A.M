import pool from './config/db.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    console.log('🌱 Actualizando credenciales en PostgreSQL...');

    // 1. Verificar/Crear Roles
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

    // 3. Generar Hash
    const passwordHash = await bcrypt.hash('Admin123*', 10);

    // 4. Insertar o actualizar credenciales de Administrador
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
      passwordHash,
      'Activo'
    ]);

    console.log('✅ Credenciales de Administrador actualizadas con éxito');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando el seed:', error.message);
    process.exit(1);
  }
};

seedDatabase();