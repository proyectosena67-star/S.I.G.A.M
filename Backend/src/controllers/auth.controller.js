import { AuthService } from '../services/auth.service.js';

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const resultado = await AuthService.login(username, password);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Registro de usuario
export const registro = async (req, res) => {
  try {
    const nuevoUsuario = await AuthService.registrar(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};