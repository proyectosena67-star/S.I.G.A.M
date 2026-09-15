// Middleware para validar que los datos requeridos vengan en la petición al agendar cita
export const validarCrearCita = (req, res, next) => {
  const { id_paciente, fecha_hora } = req.body;

  if (!id_paciente) {
    return res.status(400).json({ error: 'El ID del paciente es obligatorio.' });
  }

  if (!fecha_hora) {
    return res.status(400).json({ error: 'La fecha y hora de la cita son obligatorias.' });
  }

  // Validar formato de fecha/hora básico
  const fecha = new Date(fecha_hora);
  if (isNaN(fecha.getTime())) {
    return res.status(400).json({ error: 'La fecha_hora provista no tiene un formato válido.' });
  }

  next();
};

// Middleware para verificar permisos por rol (ej. Solo Médicos, Admisiones y Admin pueden agendar)
export const validarRolAgendamiento = (req, res, next) => {
  const rolesPermitidos = ['ADMIN', 'MEDICO', 'ADMISIONES'];
  
  if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
    return res.status(403).json({ 
      error: 'Acceso denegado: No tienes permisos suficientes para realizar esta acción.' 
    });
  }

  next();
};