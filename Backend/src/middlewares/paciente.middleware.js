// Middleware para validar datos al registrar un nuevo paciente
export const validarCrearPaciente = (req, res, next) => {
  const { 
    tipo_documento, 
    numero_documento, 
    primer_nombre, 
    primer_apellido 
  } = req.body;

  // Tipos de documentos válidos en el sistema (ej. Colombia/SIGAM)
  const tiposValidos = ['CC', 'TI', 'CE', 'PASAPORTE', 'RC'];

  if (!tipo_documento || !tiposValidos.includes(tipo_documento.toUpperCase())) {
    return res.status(400).json({ 
      error: `El tipo de documento es obligatorio y debe ser uno de los siguientes: ${tiposValidos.join(', ')}.` 
    });
  }

  if (!numero_documento || typeof numero_documento !== 'string' || numero_documento.trim() === '') {
    return res.status(400).json({ error: 'El número de documento es obligatorio.' });
  }

  if (!primer_nombre || !primer_apellido) {
    return res.status(400).json({ error: 'El primer nombre y el primer apellido son obligatorios.' });
  }

  next();
};

// Middleware para validar el parámetro :id en las rutas que lo requieran
export const validarIdPaciente = (req, res, next) => {
  const { id } = req.params;
  const idNumerico = parseInt(id, 10);

  if (isNaN(idNumerico) || idNumerico <= 0) {
    return res.status(400).json({ error: 'El ID del paciente debe ser un número entero válido.' });
  }

  next();
};