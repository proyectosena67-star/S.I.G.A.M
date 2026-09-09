import { crearCitaService, obtenerCitasService } from '../services/cita.service.js';

export const crearCita = async (req, res) => {
  try {
    const { id_paciente, fecha_hora } = req.body;

    if (!id_paciente || !fecha_hora) {
      return res.status(400).json({
        ok: false,
        message: 'Los campos id_paciente y fecha_hora son obligatorios'
      });
    }

    const nuevaCita = await crearCitaService(req.body);

    res.status(201).json({
      ok: true,
      message: 'Cita médica agendada correctamente',
      data: nuevaCita
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al agendar la cita médica',
      error: error.message
    });
  }
};

export const obtenerCitas = async (req, res) => {
  try {
    const citas = await obtenerCitasService();
    res.status(200).json({
      ok: true,
      data: citas
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener la lista de citas',
      error: error.message
    });
  }
};