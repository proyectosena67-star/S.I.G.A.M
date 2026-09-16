import pool from '../config/db.js';
import { Factura } from '../models/factura.model.js';

export const facturaRepository = {
  // Obtener todas las facturas con el nombre del paciente asociado
  async findAll() {
    const query = `
      SELECT f.*, 
             (p.primer_nombre || ' ' || p.primer_apellido) AS paciente_nombre
      FROM facturas f
      LEFT JOIN pacientes p ON f.id_paciente = p.id_paciente
      ORDER BY f.fecha_emision DESC;
    `;
    const { rows } = await pool.query(query);
    return rows.map(row => new Factura(row));
  },

  // Crear una nueva factura
  async create(datos) {
    const { id_paciente, total, estado, observaciones } = datos;
    const query = `
      INSERT INTO facturas (id_paciente, total, estado, observaciones)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id_paciente, total, estado || 'PENDIENTE', observaciones || '']);
    return new Factura(rows[0]);
  }
};