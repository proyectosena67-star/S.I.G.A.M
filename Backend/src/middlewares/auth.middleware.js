import jwt from 'jsonwebtoken';

/**
 * Middleware para validar el Token JWT en peticiones protegidas.
 * Espera un header: Authorization: Bearer <token>
 */
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: 'Acceso denegado: No se proporcionó el encabezado de autorización'
    });
  }

  // Verificar formato Bearer <token>
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({
      ok: false,
      message: 'Formato de token inválido. El formato correcto es: Bearer <token>'
    });
  }

  const token = tokenParts[1];

  try {
    // Verificar y decodificar el token con la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adjuntar la información decodificada del usuario a la petición (req)
    req.usuario = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        ok: false,
        message: 'Sesión expirada: El token ha caducado. Por favor inicie sesión nuevamente.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        ok: false,
        message: 'Acceso denegado: Token inválido o manipulado.'
      });
    }

    return res.status(500).json({
      ok: false,
      message: 'Error interno al validar la autenticación'
    });
  }
};

/**
 * Middleware opcional para restringir acceso según el rol del usuario.
 * Ejemplo de uso en rutas: router.get('/', verificarToken, esRol('Administrador', 'Médico'), controlador);
 */
export const esRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario no autenticado'
      });
    }

    const { rol } = req.usuario;

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({
        ok: false,
        message: `Acceso restringido: Se requiere rol [${rolesPermitidos.join(', ')}]`
      });
    }

    next();
  };
};