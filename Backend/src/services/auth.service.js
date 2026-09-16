import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository.js';

export const AuthService = {
  async login(correo, password) {
    // 1. Buscar usuario por correo
    const usuario = await AuthRepository.findByCorreo(correo);
    if (!usuario) {
      throw new Error('Credenciales inválidas.');
    }

    // 2. Verificar estado de la cuenta
    if (usuario.estado !== 'Activo') {
      throw new Error('El usuario se encuentra inactivo.');
    }

    // 3. Comparación directa en texto plano
    if (usuario.password_hash !== password) {
      throw new Error('Credenciales inválidas.');
    }

    // 4. Generar Token JWT con llaves primarias de tu esquema DB
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        id_rol: usuario.id_rol,
        rol_nombre: usuario.rol_nombre,
        correo: usuario.correo
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    return {
      token,
      usuario: usuario.toPublicJSON ? usuario.toPublicJSON() : usuario
    };
  },

  async registrar(datos) {
    // 1. Validar duplicidad por correo
    const existe = await AuthRepository.findByCorreo(datos.correo);
    if (existe) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    // 2. Guardar contraseña en texto plano en la columna password_hash
    const nuevoUsuario = await AuthRepository.create({
      ...datos,
      password_hash: datos.password
    });

    return nuevoUsuario.toPublicJSON ? nuevoUsuario.toPublicJSON() : nuevoUsuario;
  }
};