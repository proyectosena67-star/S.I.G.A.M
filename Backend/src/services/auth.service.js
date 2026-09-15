import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository.js';

export const AuthService = {
  async login(username, password) {
    const usuario = await AuthRepository.findByUsername(username);
    if (!usuario) {
      throw new Error('Credenciales inválidas.');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      throw new Error('Credenciales inválidas.');
    }

    const token = jwt.sign(
      { id_usuario: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    return { 
      token, 
      usuario: usuario.toPublicJSON() 
    };
  },

  async registrar(datos) {
    const existe = await AuthRepository.findByUsername(datos.username);
    if (existe) {
      throw new Error('El usuario o correo ya se encuentra registrado.');
    }

    const passwordHashed = await bcrypt.hash(datos.password, 10);
    const nuevoUsuario = await AuthRepository.create({ ...datos, password: passwordHashed });
    return nuevoUsuario.toPublicJSON();
  }
};