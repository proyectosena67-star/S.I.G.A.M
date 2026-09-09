import { loginService } from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Por favor ingrese usuario y contraseña',
      });
    }

    const resultado = await loginService(correo, password);

    if (!resultado) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Inicio de sesión exitoso',
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error en el servidor al autenticar',
      error: error.message,
    });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    // req.usuario viene asignado desde el middleware verificarToken
    res.status(200).json({
      ok: true,
      data: req.usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener el perfil del usuario',
    });
  }
};