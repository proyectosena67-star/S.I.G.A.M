import pool from '../../../Backend/config/db.js';

export const crearPacienteService = async (datosPaciente) => {
  const {
    tipo_documento,
    numero_documento,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    genero, // Se recibe en el body y se inserta en sexo_biologico
    direccion,
    telefono,
    correo,
    eps
  } = datosPaciente;

  const query = `
    INSERT INTO pacientes (
      tipo_documento, 
      numero_documento, 
      primer_nombre, 
      segundo_nombre,
      primer_apellido, 
      segundo_apellido, 
      fecha_nacimiento, 
      sexo_biologico,
      direccion, 
      telefono, 
      correo
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
    tipo_documento,
    numero_documento,
    primer_nombre,
    segundo_nombre || null,
    primer_apellido,
    segundo_apellido || null,
    fecha_nacimiento,
    genero, // Mapeado a sexo_biologico
    direccion || null,
    telefono || null,
    correo || null
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const obtenerPacientesService = async () => {
  const query = 'SELECT * FROM pacientes ORDER BY fecha_registro DESC';
  const { rows } = await pool.query(query);
  return rows;
};