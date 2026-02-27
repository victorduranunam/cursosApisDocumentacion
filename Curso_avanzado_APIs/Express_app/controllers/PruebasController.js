// controllers/PruebasController.js

// Saluda a un usuario usando un parámetro en la URL
const saludar = (req, res) => {
    const { nombre } = req.params;

    res.json({
        success: true,
        data: { nombre },
        message: `Hola, ${nombre}. ¡Bienvenido a Express!`
    });
};

// Obtiene datos del alumno desde query strings
const datosAlumno = (req, res) => {
    const {
        nombre = 'Sin nombre',
        edad = 18,
        ciudad = 'Desconocida'
    } = req.query;

    res.json({
        success: true,
        data: { nombre, edad, ciudad },
        message: 'Datos del alumno obtenidos correctamente'
    });
};

// Recibe datos del alumno vía body (POST)
const enviarDatos = (req, res) => {
    const { nombre, edad, ciudad } = req.body;

    res.json({
        success: true,
        data: { nombre, edad, ciudad },
        message: 'Datos recibidos correctamente'
    });
};

// Verifica una clave enviada por header (ya validada en middleware)
const verificarClave = (req, res) => {
    res.json({
        success: true,
        data: null,
        message: '¡Clave validada correctamente!'
    });
};

module.exports = {
    saludar,
    datosAlumno,
    enviarDatos,
    verificarClave
};
