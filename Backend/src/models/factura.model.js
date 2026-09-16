export class Factura {
  constructor({ 
    id_factura, 
    id_paciente, 
    paciente_nombre, 
    total, 
    estado, 
    observaciones, 
    fecha_emision 
  }) {
    this.id = id_factura;
    this.idPaciente = id_paciente;
    this.pacienteNombre = paciente_nombre || null;
    this.total = total !== undefined ? Number(total) : 0;
    this.estado = estado || 'PENDIENTE';
    this.observaciones = observaciones || '';
    this.fechaEmision = fecha_emision || new Date();
  }

  // Validar si la factura ya fue pagada
  estaPagada() {
    return this.estado === 'PAGADA';
  }

  // Formatear respuesta segura para el frontend o reportes
  toPublicJSON() {
    return {
      id: this.id,
      idPaciente: this.idPaciente,
      pacienteNombre: this.pacienteNombre,
      total: this.total,
      estado: this.estado,
      observaciones: this.observaciones,
      fechaEmision: this.fechaEmision
    };
  }
}