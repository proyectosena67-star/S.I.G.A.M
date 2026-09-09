import { crearPacienteService, obtenerPacientesService } from '../services/paciente.service.js';

export const registrarPaciente = async (req, res) => {
  try {
    const paciente = await crearPacienteService(req.body);
    res.status(201).json({
      ok: true,
      message: 'Paciente registrado correctamente',
      data: paciente,
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        ok: false,
        message: 'Ya existe un paciente con este número de documento',
      });
    }
    res.status(500).json({
      ok: false,
      message: 'Error al registrar el paciente',
      error: error.message,
    });
  }
};

export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await obtenerPacientesService();
    res.status(200).json({
      ok: true,
      data: pacientes,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener la lista de pacientes',
      error: error.message,
    });
  }
};