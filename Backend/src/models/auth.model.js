export class Usuario {
  constructor({ 
    id_usuario, 
    username, 
    email, 
    password, 
    id_rol, 
    rol_nombre, 
    estado,
    fecha_creacion 
  }) {
    this.id = id_usuario;
    this.username = username;
    this.email = email;
    this.password = password; // Se mantiene en la instancia solo para verificación en la capa de AuthService
    this.idRol = id_rol;
    this.rol = rol_nombre || null;
    this.estado = estado ?? true;
    this.fechaCreacion = fecha_creacion || new Date();
  }

  // Comprobar si la cuenta de usuario está activa
  isActivo() {
    return Boolean(this.estado);
  }

  // Formatear respuesta segura para el frontend (sin contraseña)
  toPublicJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      idRol: this.idRol,
      rol: this.rol,
      estado: this.estado
    };
  }
}