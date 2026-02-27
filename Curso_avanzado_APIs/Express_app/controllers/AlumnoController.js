const { validationResult } = require('express-validator');
const AlumnoService = require('../services/AlumnoService');

// Formato de respuesta estándar
const respuesta = (res, success, data, message, status = 200) => {
  return res.status(status).json({ success, data, message });
};

const guardar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return respuesta(res, false, null, errors.array(), 422);
  }

  try {
    const alumno = await AlumnoService.crear(req.body);
    return respuesta(res, true, alumno, 'Alumno creado correctamente', 201);
  } catch (error) {
    return respuesta(res, false, null, error.message, 500);
  }
};

const mostrar = async (req, res) => {
  try {
    const alumnos = await AlumnoService.obtenerTodos();
    return respuesta(res, true, alumnos, 'Listado de alumnos');
  } catch (error) {
    return respuesta(res, false, null, error.message, 500);
  }
};

const obtenerPorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return respuesta(res, false, null, errors.array(), 422);
  }

  try {
    const alumno = await AlumnoService.obtenerPorId(req.params.id);
    if (!alumno) return respuesta(res, false, null, 'Alumno no encontrado', 404);
    return respuesta(res, true, alumno, 'Alumno encontrado');
  } catch (error) {
    return respuesta(res, false, null, error.message, 500);
  }
};

const actualizar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return respuesta(res, false, null, errors.array(), 422);
  }

  try {
    const alumno = await AlumnoService.actualizar(req.params.id, req.body);
    if (!alumno) return respuesta(res, false, null, 'Alumno no encontrado', 404);
    return respuesta(res, true, alumno, 'Alumno actualizado correctamente');
  } catch (error) {
    return respuesta(res, false, null, error.message, 500);
  }
};

const eliminar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return respuesta(res, false, null, errors.array(), 422);
  }

  try {
    const eliminado = await AlumnoService.eliminar(req.params.id);
    if (!eliminado) return respuesta(res, false, null, 'Alumno no encontrado', 404);
    return respuesta(res, true, null, 'Alumno eliminado correctamente');
  } catch (error) {
    return respuesta(res, false, null, error.message, 500);
  }
};

module.exports = {
  guardar,
  mostrar,
  obtenerPorId,
  actualizar,
  eliminar
};
