export const validarAtencionMedica = (req, res, next) => {
  const { id_paciente, subjetivo, objetivo, analisis, plan } = req.body;

  if (!id_paciente || !subjetivo || !objetivo || !analisis || !plan) {
    return res.status(400).json({ 
      error: 'Los campos id_paciente, subjetivo, objetivo, analisis y plan son obligatorios.' 
    });
  }

  next();
};