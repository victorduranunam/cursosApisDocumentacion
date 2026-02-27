let alumnos = []; // Arreglo en memoria
let nextId = 1;   // Autoincremento simulado

class AlumnoService {
  // Crear un alumno
  static async crear({ nombre, correo, direccion, edad }) {
    // Validar correo único
    if (alumnos.some(a => a.correo === correo)) {
      throw new Error('El correo ya está registrado');
    }

    const alumno = { id: nextId++, nombre, correo, direccion, edad };
    alumnos.push(alumno);
    return alumno;
  }

  // Obtener todos los alumnos
  static async obtenerTodos() {
    return alumnos;
  }

  // Obtener alumno por ID
  static async obtenerPorId(id) {
    id = parseInt(id);
    return alumnos.find(a => a.id === id) || null;
  }

  // Actualizar alumno
  static async actualizar(id, datos) {
    id = parseInt(id);
    const index = alumnos.findIndex(a => a.id === id);
    if (index === -1) return null;

    // Validar correo único si se actualiza
    if (datos.correo && alumnos.some(a => a.correo === datos.correo && a.id !== id)) {
      throw new Error('El correo ya está registrado por otro alumno');
    }

    alumnos[index] = { ...alumnos[index], ...datos };
    return alumnos[index];
  }

  // Eliminar alumno
  static async eliminar(id) {
    id = parseInt(id);
    const index = alumnos.findIndex(a => a.id === id);
    if (index === -1) return false;

    alumnos.splice(index, 1);
    return true;
  }
}

module.exports = AlumnoService;
