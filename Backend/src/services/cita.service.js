import pool from '../../../Backend/config/db.js';

export const crearCitaService = async (datosCita) => {
  const {
    id_paciente,
    id_medico,
    id_convenio,
    fecha_hora,
    tipo_consulta,
    motivo,
    observaciones
  } = datosCita;

  // Ajustado con motivo_consulta según el esquema de la base de datos
  const query = `
    INSERT INTO citas (
      id_paciente, 
      id_medico, 
      id_convenio,
      fecha_hora, 
      tipo_consulta, 
      motivo_consulta
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    parseInt(id_paciente, 10),
    id_medico ? parseInt(id_medico, 10) : null,
    id_convenio ? parseInt(id_convenio, 10) : null,
    fecha_hora,
    tipo_consulta || 'Consulta General',
    motivo || observaciones || null
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const obtenerCitasService = async () => {
  const query = `
    SELECT 
      c.id_cita,
      c.fecha_hora,
      c.tipo_consulta,
      c.motivo_consulta,
      c.estado,
      p.id_paciente,
      CONCAT(p.primer_nombre, ' ', p.primer_apellido) AS paciente,
      p.numero_documento AS paciente_documento
    FROM citas c
    INNER JOIN pacientes p ON c.id_paciente = p.id_paciente
    ORDER BY c.fecha_hora ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};