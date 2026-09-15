import pool from '../config/db.js';
import { Paciente } from '../models/paciente.model.js';

export const PacienteRepository = {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM pacientes ORDER BY id_paciente DESC');
    return rows.map(row => new Paciente(row));
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM pacientes WHERE id_paciente = $1', [id]);
    if (!rows[0]) return null;
    return new Paciente(rows[0]);
  },

  async create(datos) {
    const { tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, telefono } = datos;
    const query = `
      INSERT INTO pacientes (tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, telefono)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, telefono];
    const { rows } = await pool.query(query, values);
    return new Paciente(rows[0]);
  }
};