import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginService = async (correo, password) => {
  // Buscar usuario por correo e incluir su rol
  const queryText = `
    SELECT u.id_usuario, u.correo, u.password_hash, u.nombres, u.apellidos, u.estado, r.nombre AS nombre_rol
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.correo = $1
  `;
  
  const result = await pool.query(queryText, [correo]);

  if (result.rows.length === 0) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const user = result.rows[0];

  if (user.estado !== 'Activo') {
    throw new Error('El usuario se encuentra inactivo. Contacte al administrador.');
  }

  // Verificar la contraseña con bcrypt
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  // Generar Token JWT
  const token = jwt.sign(
    {
      id_usuario: user.id_usuario,
      correo: user.correo,
      rol: user.nombre_rol
    },
    process.env.JWT_SECRET || 'super_secreto_sigap_2026_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  return {
    token,
    user: {
      id_usuario: user.id_usuario,
      correo: user.correo,
      nombres: user.nombres,
      apellidos: user.apellidos,
      rol: user.nombre_rol
    }
  };
};