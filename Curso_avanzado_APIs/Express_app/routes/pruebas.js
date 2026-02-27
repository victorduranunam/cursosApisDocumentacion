// routes/pruebas.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const PruebasController = require('../controllers/PruebasController');

// Middleware para validar API Key
const validarApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== 'millave1234') {
    return res.status(401).json({ success: false, data: null, message: 'Clave incorrecta' });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Pruebas
 *   description: Rutas de prueba para API
 */

/**
 * @swagger
 * /saludar/{nombre}:
 *   get:
 *     summary: Saluda a un usuario
 *     tags: [Pruebas]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/saludar/:nombre', PruebasController.saludar);

/**
 * @swagger
 * /datosAlumno:
 *   get:
 *     summary: Obtener datos del alumno
 *     tags: [Pruebas]
 *     parameters:
 *       - name: nombre
 *         in: query
 *         schema:
 *           type: string
 *           default: Sin nombre
 *       - name: edad
 *         in: query
 *         schema:
 *           type: integer
 *           default: 18
 *       - name: ciudad
 *         in: query
 *         schema:
 *           type: string
 *           default: Desconocida
 *     responses:
 *       200:
 *         description: Datos del alumno
 */
router.get('/datosAlumno', PruebasController.datosAlumno);

/**
 * @swagger
 * /enviarDatos:
 *   post:
 *     summary: Registrar datos del alumno vía body
 *     tags: [Pruebas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, edad, ciudad]
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *               ciudad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos recibidos correctamente
 *       422:
 *         description: Error de validación
 */
router.post(
  '/enviarDatos',
  [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('edad').isInt({ min: 1 }).withMessage('La edad debe ser un número mayor a 0'),
    body('ciudad').isString().notEmpty().withMessage('La ciudad es obligatoria')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, data: null, message: errors.array() });
    }
    next();
  },
  PruebasController.enviarDatos
);

/**
 * @swagger
 * /verificarClave:
 *   post:
 *     summary: Verifica la clave enviada en el header
 *     tags: [Pruebas]
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           default: millave1234
 *     responses:
 *       200:
 *         description: Acceso concedido
 *       401:
 *         description: Clave incorrecta
 */
router.post('/verificarClave', validarApiKey, PruebasController.verificarClave);

module.exports = router;
